from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from rest_framework.authtoken.models import Token

from chat.models import Group, Participant, Message
from chat.utils import get_user, get_groupId, last_25_messages


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        messages = last_25_messages(data['groupName'])

        # serialize the data to json
        context = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }

        self.send_message(context)

    def new_message(self, data):
        print(data, 'data')
        message = data['message']
        user = get_user(data['from'])
        group = get_groupId(data['groupName'])
        # print(user.id, message, user, group, 'good')

        message = Message.objects.create(
            sender=user,
            group=group,
            message=message
        )
        message.save()

        content = {
            'command': 'new_message',
            'id': message.id,
            'sender': user.username,
            'message': data['message'],
            'timestamp': str(message.timestamp)
        }

        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'sender': message.sender.username,
            'message': message.message,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        # print(self.scope, 'selfish')
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.token_key = self.scope['url_route']['kwargs']['token']
        self.room_group_name = 'chat_%s' % self.room_name

        if self.token_key:
            self.token = Token.objects.get(key=self.token_key)
            self.scope['user'] = self.token.user

        self.user = self.scope['user']
        # print(self.user, 'user')

        self.participant = Participant.objects.filter(
            group__name=self.room_name).get(user__username=self.user)
        # print(self.participant.user.username, self.user)

        if self.user == self.participant.user:
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            self.accept()

        else:
            self.close()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        # accessing function[function name](patameter to functions)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))

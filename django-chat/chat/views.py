from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.shortcuts import get_object_or_404
import json

from django.contrib.auth.models import User
from chat.models import Friend, Group, Participant

# Create your views here.


def index(request):
    return render(request, 'chat/index.html', {})


@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {'room_name_json': mark_safe(json.dumps(room_name))})


def contact(request):
    friends = Friend.objects.filter(
        Q(status=1) | Q(status=2), Q(user=request.user) | Q(friend=request.user))
    friend_list = friends.values_list('friend_id', flat=True)
    contact = User.objects.all().exclude(
        id=request.user.id).exclude(id__in=friend_list)
    # print(friends, '\n', friend_list, '\n', contact, '\n', 'ok')
    context = {
        # friends updated in api
        'friends': friends,
        'contact': contact,
    }
    return render(request, 'chat/contact.html', context)


def addcontact(request, pk):
    friend_user = User.objects.get(pk=pk)
    one_name = friend_user.username+'_'+request.user.username
    two_name = request.user.username+'_'+friend_user.username
    print(one_name, two_name)
    try:
        friend = Friend.objects.get(Q(Q(user=request.user) & Q(
            friend=friend_user)) | Q(Q(user=friend_user) & Q(friend=request.user)))

        group = Group.objects.get(
            Q(name=one_name) | Q(name=two_name), private=True)

        # friend.status = 0
        # friend.save()

    except Friend.DoesNotExist:
        group = Group.objects.create(
            name=two_name,
            private=True
        )
        group.save()
        friend = Friend.objects.create(
            user=request.user,
            friend=friend_user,
            group=group,
            # change it later
            status=1,
        )
        friend.save()
        participant = Participant.objects.create(
            user=request.user,
            group=group
        )
        participant.save()
        participant = Participant.objects.create(
            user=friend_user,
            group=group
        )
        participant.save()

    except Group.DoesNotExist:
        pass

    # try:
    #     has_group = Group.objects.get(
    #         Q(name=one_name) | Q(name=two_name), private=True)
    # except Group.DoesNotExist:
    #     has_group = 'faksfkj'

    print(friend, group, 'nice')
    return redirect('chat:contact')

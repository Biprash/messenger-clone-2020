from django.urls import path # re_path

from chat import consumers

websocket_urlpatterns = [
    # re_path(r'ws/chat/(?P<room_name>\w+)/(?P<token>\w+)/$',
    #         consumers.ChatConsumer.as_asgi()),
    path('ws/chat/<str:room_name>/<str:token>/', consumers.ChatConsumer.as_asgi()),
]
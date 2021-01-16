from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
from chat.models import Profile, Friend
from chat_api.utils import friendsJson
# Create your views here.


@api_view(['POST'])
def getUser(request):
    # user = request.user
    username = request.data['username']
    user = User.objects.get(username=username)
    profile, created = Profile.objects.get_or_create(user=user)
    print(profile.profile_pic)
    user_detail = {
        'firstname': user.first_name,
        'lastname': user.last_name,
        'email': user.email,
        'profile_pic': profile.profile_pic.url,
    }
    return JsonResponse(user_detail)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def contact(request):
    friends = Friend.objects.filter(
        Q(status=1) | Q(status=2), Q(user=request.user) | Q(friend=request.user))
    # Q(status=1) | Q(status=2), user=request.user)
    friend_list = friends.values_list('friend_id', flat=True)
    contact = User.objects.all().exclude(
        id=request.user.id).exclude(id__in=friend_list)
    # print(friends, '\n', friend_list, '\n', contact, '\n', 'ok')
    friends = friendsJson(friends, request.user)
    context = {
        'friends': friends,
        # 'contact': serializers.serialize('json', contact),
    }
    return JsonResponse(context)

from chat.models import Profile


def friendsJson(friends, user):
    result = []
    for friend in friends:
        result.append(friend_to_json(friend, user))
    return result


def friend_to_json(friend, user):
    if friend.friend == user:
        profile, created = Profile.objects.get_or_create(user=friend.user)
        return {
            'username': friend.user.username,
            'first_name': friend.user.first_name,
            'last_name': friend.user.last_name,
            'profile_pic': profile.profile_pic.url,
            'group_name': friend.group.name

        }
    else:
        profile, created = Profile.objects.get_or_create(user=friend.friend)
        return {
            'username': friend.friend.username,
            'first_name': friend.friend.first_name,
            'last_name': friend.friend.last_name,
            'profile_pic': profile.profile_pic.url,
            'group_name': friend.group.name
        }

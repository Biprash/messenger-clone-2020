from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=True, null=True)
    profile_pic = models.ImageField(
        upload_to='profile_picture/', default='default.png', blank=True, null=True)


class Group(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    private = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Friend(models.Model):
    STATUS = {
        (0, 'Pending Friend Request'),
        (1, 'Confirm Friend Request'),
        (2, 'You'),
        (3, 'Unfriend'),
    }
    user = models.ForeignKey(User, related_name='user',
                             on_delete=models.SET_NULL, blank=True, null=True)
    friend = models.ForeignKey(
        User, related_name='friend', on_delete=models.SET_NULL, blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, blank=True, null=True)
    date_connected = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} to {self.friend.username} - {self.status}"


class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} to {self.group.name} - {self.date_joined}"


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

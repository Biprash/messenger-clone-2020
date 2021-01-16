from django.contrib import admin
from chat.models import Profile, Group, Participant, Message, Friend

# Register your models here.

admin.site.register(Profile)
admin.site.register(Group)
admin.site.register(Participant)
admin.site.register(Message)
admin.site.register(Friend)

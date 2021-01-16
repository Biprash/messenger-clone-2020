from django.urls import path, include
from chat import views

app_name = 'chat'

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('addcontact/<int:pk>/', views.addcontact, name='addcontact'),
    path('<str:room_name>/', views.room, name='room'),
]

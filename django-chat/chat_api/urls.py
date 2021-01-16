from django.urls import path
from chat_api import views

urlpatterns = [
    path('getuser/', views.getUser),
    path('contact/', views.contact),
]

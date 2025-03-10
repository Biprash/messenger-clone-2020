"""django_chat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls')),
    path('chat/api/', include('chat_api.urls')),
    path('api-auth/', include('rest_framework.urls')),

    path('api/auth/', include('dj_rest_auth.urls')),  # Use dj_rest_auth for login/logout etc.
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration URL

    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

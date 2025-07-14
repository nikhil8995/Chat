from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('chat/<str:username>/', views.chat_room, name='chat_room'),
    path('send_message/', views.send_message, name='send_message'),
    path('fetch_messages/<str:username>/', views.fetch_messages, name='fetch_messages'),
] 
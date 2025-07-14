from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Message
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.http import require_GET

# Create your views here.

@login_required
def home(request):
    users = User.objects.exclude(id=request.user.id)
    return render(request, 'chat/home.html', {'users': users})

@login_required
def chat_room(request, username):
    other_user = User.objects.get(username=username)
    messages = Message.objects.filter(
        Q(sender=request.user, receiver=other_user) |
        Q(sender=other_user, receiver=request.user)
    ).order_by('timestamp')
    return render(request, 'chat/room.html', {'other_user': other_user, 'messages': messages})

@login_required
def send_message(request):
    if request.method == 'POST':
        receiver_username = request.POST.get('receiver')
        content = request.POST.get('content')
        receiver = User.objects.get(username=receiver_username)
        msg = Message.objects.create(sender=request.user, receiver=receiver, content=content)
        return JsonResponse({'status': 'ok', 'message': str(msg)})
    return JsonResponse({'status': 'fail'})

@require_GET
@login_required
def fetch_messages(request, username):
    other_user = User.objects.get(username=username)
    messages = Message.objects.filter(
        Q(sender=request.user, receiver=other_user) |
        Q(sender=other_user, receiver=request.user)
    ).order_by('timestamp')
    data = [
        {
            'sender': msg.sender.username,
            'content': msg.content,
            'timestamp': msg.timestamp.strftime('%H:%M:%S'),
            'is_sent': msg.sender == request.user
        }
        for msg in messages
    ]
    return JsonResponse({'messages': data})


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'chat/register.html', {'form': form})

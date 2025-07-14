document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('send-form');
    const chatBox = document.getElementById('chat-box');
    const msgInput = document.getElementById('msg-input');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch('/send_message/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    const now = new Date();
                    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
                    const msgDiv = document.createElement('div');
                    msgDiv.className = 'message sent';
                    msgDiv.innerHTML = `<span class="sender">You</span><span class="content">${formData.get('content')}</span><span class="timestamp">${time}</span>`;
                    chatBox.appendChild(msgDiv);
                    msgInput.value = '';
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
            });
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}); 
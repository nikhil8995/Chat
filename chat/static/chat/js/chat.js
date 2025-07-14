document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('send-form');
    const chatBox = document.getElementById('chat-box');
    const msgInput = document.getElementById('msg-input');
    const chatBoxParent = document.querySelector('.chat-box');
    // Get the other user's username from a hidden input or data attribute
    let otherUser = null;
    if (form) {
        const receiverInput = form.querySelector('input[name="receiver"]');
        if (receiverInput) {
            otherUser = receiverInput.value;
        }
    }
    function renderMessages(messages) {
        chatBox.innerHTML = '';
        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message ' + (msg.is_sent ? 'sent' : 'received');
            msgDiv.innerHTML = `<span class="sender">${msg.sender}</span><span class="content">${msg.content}</span><span class="timestamp">${msg.timestamp}</span>`;
            chatBox.appendChild(msgDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function fetchMessages() {
        if (!otherUser) return;
        fetch(`/fetch_messages/${otherUser}/`)
            .then(response => response.json())
            .then(data => {
                renderMessages(data.messages);
            });
    }
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
                    fetchMessages();
                    msgInput.value = '';
                }
            });
        });
        fetchMessages();
        setInterval(fetchMessages, 3000);
    }
}); 
function searchFunction() {
  var input, filter, chatList, chatHistory, userChat, i, txtValue;
  input = document.getElementById('search-input');
  filter = input.value.toLowerCase();
  chatList = document.getElementById("chat-list");
  chatHistory = chatList.getElementsByClassName('chat-history');

  for (i = 0; i < chatHistory.length; i++) {
      userChat = chatHistory[i].getElementsByClassName("user-chat")[0];
      if (userChat) {
          txtValue = userChat.textContent || userChat.innerText;
          if (txtValue.toLowerCase().indexOf(filter) > -1) {
              chatHistory[i].style.display = "";
          } else {
              chatHistory[i].style.display = "none";
          }
      }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const chatHistories = document.querySelectorAll('.chat-history');
  const activeUserImg = document.getElementById('active-user-img');
  const activeUserName = document.getElementById('active-user-name');
  const chatMessages = document.getElementById('chat-messages');

  chatHistories.forEach(chat => {
    chat.addEventListener('click', function () {
      const userName = chat.getAttribute('data-name');
      const userImg = chat.getAttribute('data-img');
      const userText = chat.getAttribute('data-text');

      activeUserImg.src = userImg;
      activeUserName.textContent = userName;

      loadChatHistory(userName, userImg, userText);
    });
  });

  document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (message !== '') {
      const chatMessages = document.getElementById('chat-messages');
      const userName = activeUserName.textContent;
      
      const outgoingDiv = document.createElement('div');
      outgoingDiv.classList.add('chat-outcoming');

      const bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('chat-bubble');

      const span = document.createElement('span');
      span.textContent = message;

      const img = document.createElement('img');
      img.classList.add('user');
      img.src = 'https://cdn.jsdelivr.net/gh/JacketJK/upload/DR-Samit_Chone.png';

      bubbleDiv.appendChild(span);
      outgoingDiv.appendChild(bubbleDiv);
      outgoingDiv.appendChild(img);

      chatMessages.appendChild(outgoingDiv);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight; 

      saveMessage(userName, message, 'outgoing');
    }
  });
});

function saveMessage(userName, message, type) {
  let chatHistory = JSON.parse(localStorage.getItem(userName)) || [];
  chatHistory.push({ message, type });
  localStorage.setItem(userName, JSON.stringify(chatHistory));
}

function loadChatHistory(userName, userImg, userText) {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';

  if (userText) {
    const initialChatBubble = document.createElement('div');
    initialChatBubble.classList.add('chat-incoming');
    initialChatBubble.innerHTML = `
        <img class="user" src="${userImg}">
        <div class="chat-bubble">
          <span>${userText}</span>
        </div>
      `;
    chatMessages.appendChild(initialChatBubble);
  }

  const chatHistory = JSON.parse(localStorage.getItem(userName)) || [];

  chatHistory.forEach(chat => {
    const chatBubble = document.createElement('div');
    chatBubble.classList.add(chat.type === 'outgoing' ? 'chat-outcoming' : 'chat-incoming');
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('chat-bubble');

    const span = document.createElement('span');
    span.textContent = chat.message;

    const img = document.createElement('img');
    img.classList.add('user');
    img.src = chat.type === 'outgoing' ? 'https://cdn.jsdelivr.net/gh/JacketJK/upload/DR-Samit_Chone.png' : userImg;

    if (chat.type === 'outgoing') {
      bubbleDiv.appendChild(span);
      chatBubble.appendChild(bubbleDiv);
      chatBubble.appendChild(img);
    } else {
      chatBubble.appendChild(img);
      bubbleDiv.appendChild(span);
      chatBubble.appendChild(bubbleDiv);
    }

    chatMessages.appendChild(chatBubble);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

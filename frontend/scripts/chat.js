import { Render_HTML_ChatMessage } from "./render.js";
import { Helper_GetCurrentDateTimeString } from "./helpers.js";

const HTML_chatbox_wrapper = document.getElementById('chat-message-wrapper');
const HTML_chat_input = document.getElementById('chat-input');
const HTML_chat_send = document.getElementById('chat-send');

const socket = new WebSocket('ws://localhost:8081');

socket.onopen = () => {
    console.log('Соединение установлено');
};

socket.onmessage = event => {
    const messageArray = JSON.parse(event.data);
    console.log(messageArray);

    for(let message of messageArray){
        const template = document.createElement('template');
        template.innerHTML = Render_HTML_ChatMessage(userType === message.author, message.text, message.date).trim();
        HTML_chatbox_wrapper.appendChild(template.content.firstChild);
        //scroll вниз
        HTML_chatbox_wrapper.scrollTo(0, HTML_chatbox_wrapper.scrollHeight);
    }
};

socket.onclose = () => {
    console.log('Соединение закрыто');
};

socket.onerror = error => {
    console.error('Ошибка WebSocket:', error);
};

//отправка по кнопке
HTML_chat_send.addEventListener('click', function() {
    sendMessage();
});
//отправка по нажатию клавиши enter
HTML_chat_input.addEventListener('keypress', function(event) {
    if(event.key === 'Enter'){
        sendMessage();
    }
});

function sendMessage(){
    const body = {
        author: userType,
        text: HTML_chat_input.value,
        date: Helper_GetCurrentDateTimeString()
    };
    socket.send(JSON.stringify(body));
    HTML_chat_input.value = '';
}
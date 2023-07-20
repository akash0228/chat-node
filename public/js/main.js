const chatForm=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');


//get user name and room from url
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

const socket=io();

//Join chatroom
socket.emit('joinRoom',{username,room});

//udhr server  emit message idhr catch
socket.on('message',message=>{
    console.log(message.text);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop=chatMessages.scrollHeight;
});

//Messsage submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //getting message text
    const message=e.target.elements.msg.value;

    //emit message to server
    socket.emit('chatMessage',message);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

//setting message on frontend
const outputMessage=(message)=>{
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
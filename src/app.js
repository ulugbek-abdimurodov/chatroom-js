//din queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    //show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

//update chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        // Unsubscribe previous listener if exists
        if (chatroom.unsub) {
            chatroom.unsub();
        }
        chatroom.getChats(data => chatUI.render(data));
    }
});
//check local storage for a name
const username = localStorage.getItem('username') ? localStorage.getItem('username') : 'anonymous';
//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats(data =>
    chatUI.render(data)
);
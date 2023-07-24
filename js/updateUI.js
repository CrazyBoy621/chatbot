import {
    sortMessagesByTime,
    smartTimeFormatter,
    formatTimeInChat,
    truncateString,
} from "./helpers.js";

const archivedChatListContainer = document.querySelector(".archived-chatlist");
const bottomBtns = document.querySelectorAll(".bottom-btn");
const description = document.querySelector(".description");
const messages = document.querySelector(".messages");
const chatInputContainer = document.querySelector(".chat-input");
let currentChat;

function scrollToBottom() {
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
document.addEventListener("DOMContentLoaded", scrollToBottom);

export function renderUI(data) {
    const template = data.map((item, index) => {
        let sortedMessages = sortMessagesByTime(item.messages);
        return `
        <div class="chat" data-id="${item.user.id}" data-archive="true">
        <img
            src="${item.user.avatar_url}"
            alt="logo"
        />
        <div class="chat-description">
            <div class="chat-label">
                <div class="name">${item.user.name}</div>
                <div class="last-seen">${smartTimeFormatter(
                    sortedMessages[0].timestamp
                )}</div>
            </div>
            <div class="chat-preview">
                <div class="chat-preview-message">
                    ${truncateString(sortedMessages[0].content.trim())}
                </div>
            </div>
        </div>
    </div>`;
    });
    archivedChatListContainer.innerHTML = "";
    archivedChatListContainer.insertAdjacentHTML(
        "afterbegin",
        template.join("")
    );

    archivedChatListContainer.addEventListener("click", (event) => {
        const clickedChat = event.target.closest(".chat");
        if (clickedChat) {
            const chatId = clickedChat.dataset.id;
            document.querySelectorAll(".chat").forEach((chat) => {
                chat.classList.remove("active");
            });
            clickedChat.classList.add("active");

            currentChat = data.filter((item) => {
                if (item.user.id == chatId) return item;
            });
            renderChatMessages(currentChat[0]);
            scrollToBottom();
            if (clickedChat.dataset.archive === "true")
                chatInputContainer.style.display = "none";
        }
    });

    activateBottomButtons();
}

function renderChatMessages(data) {
    const sortedMessages = sortMessagesByTime(data.messages).reverse();

    const messagesTemplate = sortedMessages
        .map((message) => {
            return `
        <div class="message ${
            message.user_id !== data.user.id ? "send" : "receive"
        }">
            <p>
                ${message.content}
            </p>
            <span class="time">${formatTimeInChat(message.timestamp)}</span>
        </div>
        `;
        })
        .join("");

    messages.innerHTML = "";
    messages.insertAdjacentHTML("beforeend", messagesTemplate);

    const descriptionTemplate = `
        <div>
            <img
                src="${data.user.avatar_url}"
                alt="logo"
            />
            <div class="user-name">${data.user.name}</div>
        </div>
        <button disabled>Resolved</button>
                `;

    description.innerHTML = "";
    description.insertAdjacentHTML("afterbegin", descriptionTemplate);
}

export function clearChat() {
    archivedChatListContainer.innerHTML = "";
    messages.innerHTML = "";
    description.innerHTML = "";
    disableBottomButtons();
}

function activateBottomButtons() {
    bottomBtns.forEach((button) => [(button.disabled = false)]);
}

function disableBottomButtons() {
    bottomBtns.forEach((button) => {
        if (!button.classList.contains("import")) button.disabled = true;
    });
}

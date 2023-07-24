import { importData, exportData } from "./fileSystem.js";
import { clearChat } from "./updateUI.js";

const navigatorButtonContainer = document.querySelector(".navigator-buttons");
const navigatorButtons = document.querySelectorAll(".nav-btn");
const chatLists = document.querySelectorAll(".chatlist");
const importButton = document.querySelector(".bottom-btn.import");
const clearButton = document.querySelector(".bottom-btn.clear");
const exportButton = document.querySelector(".bottom-btn.export");

navigatorButtonContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    clearActiveSidebar();
    e.target.classList.add("active");
    document
        .querySelector("." + e.target.dataset.target)
        .classList.add("active");
});

function clearActiveSidebar() {
    navigatorButtons.forEach((button) => {
        button.classList.remove("active");
    });

    chatLists.forEach((chatlist) => {
        chatlist.classList.remove("active");
    });
}

importButton.addEventListener("click", importData);
clearButton.addEventListener("click", clearChat);
exportButton.addEventListener("click", exportData);

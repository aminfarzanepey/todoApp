const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");

function main() {
    //Theme Switcher
    themeSwitcherBtn.addEventListener("click", () => {
        bodyTag.classList.toggle("light");
        const themeImg = themeSwitcherBtn.children[0];
        themeImg.setAttribute("src",
            themeImg.getAttribute("src") === "./images/icon-sun.svg"
            ? "./images/icon-moon.svg"
            : "./images/icon-sun.svg"
         )
    });

    //Add Todo In Local Storage
    addBtn.addEventListener("click", () => {
        const item = todoInput.value.trim();
        if (item){
            todoInput.value = "";
            const todos = !localStorage.getItem("todos")
            ? []
            : JSON.parse(localStorage.getItem("todos"));

            const currentTodo = {
                item: item,
                isCompleted: false,
            }

            todos.push(currentTodo);
            localStorage.setItem("todos",JSON.stringify(todos));

        }

    });
}

document.addEventListener("DOMContentLoaded", main);
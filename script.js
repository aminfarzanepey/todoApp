const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
const ul = document.querySelector(".todos");

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

    //Add Item To Card
    makeTodoElement(JSON.parse(localStorage.getItem("todos")));

    //Drag And Drop
    ul.addEventListener("dragover",(e) => {
        e.preventDefault();
        if(e.target.classList.contains("card") && !e.target.classList.contains("dragging")){
            const draggingCard = document.querySelector(".dragging");
            const cards = [...ul.querySelectorAll(".card")];
            const currentPos = cards.indexOf(draggingCard);
            const newPos = cards.indexOf(e.target);

            if (currentPos > newPos){
                ul.insertBefore(draggingCard, e.target);
            }else{
                ul.insertBefore(draggingCard, e.target.nextSibling);
            }

            const todos = JSON.parse(localStorage.getItem("todos"));
            const removed = todos.splice(currentPos, 1);
            todos.splice(newPos, 0, removed[0]);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
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
            makeTodoElement([currentTodo]);
        }

    });

    todoInput.addEventListener("keydown",(e) => {
        if(e.key == "Enter"){
            addBtn.click();
        }
    });
}

function removeTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function stateTodo(index, isComplete) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].isCompleted = isComplete;
    localStorage.setItem("todos", JSON.stringify(todos));
}

function makeTodoElement(todoArray) {

    if(!todoArray){
        return null;
    }

    const itemsLeft = document.querySelector("#items-left");

    todoArray.forEach(todoObject => {
        // Creat HTML Elements Of Todo
        const card = document.createElement("li");
        const cbContainer = document.createElement("div");
        const cbInput = document.createElement("input");
        const checkSpan = document.createElement("span");
        const pTag = document.createElement("p");
        const clearBtn = document.createElement("button");
        const img = document.createElement("img");

        //Add Classes
        card.classList.add("card");
        cbContainer.classList.add("cb-container");
        cbInput.classList.add("cb-input");
        checkSpan.classList.add("check");
        pTag.classList.add("item");
        clearBtn.classList.add("clear");

        //Add Attributes
        card.setAttribute("draggable", true);
        cbInput.setAttribute("type", "checkbox");
        img.setAttribute("src", "./images/icon-cross.svg");
        img.setAttribute("alt", "clear it")
        pTag.textContent = todoObject.item;

        if(todoObject.isCompleted){
            card.classList.add("checked");
            cbInput.setAttribute("checked","checked");
        }

        //Add Event Listener
        card.addEventListener("dragstart" ,()=>{
            card.classList.add("dragging");
        });

        card.addEventListener("dragend" ,()=>{
            card.classList.remove("dragging");
        });

        cbInput.addEventListener("click", (e)=> {
            const currentCard = cbInput.parentElement.parentElement;
            const checked = cbInput.checked;
            const currentCardIndex = [...document.querySelectorAll(".todos .card")].indexOf(currentCard);

            stateTodo(currentCardIndex, checked);

            checked ? currentCard.classList.add("checked") : currentCard.classList.remove("checked");

            itemsLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
        });

        clearBtn.addEventListener("click",(e)=>{
            const currentCard = clearBtn.parentElement;
            currentCard.classList.add("fall");
            const indexOfCurrentCard = [...document.querySelectorAll(".todos .card")].indexOf(currentCard);
            removeTodo(indexOfCurrentCard);
            currentCard.addEventListener("animationend", ()=>{
                currentCard.remove();
                itemsLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
            });
        });

        //Set Element By Parent Child
        clearBtn.appendChild(img);
        cbContainer.appendChild(cbInput);
        cbContainer.appendChild(checkSpan);

        card.appendChild(cbContainer);
        card.appendChild(pTag);
        card.appendChild(clearBtn);

        ul.appendChild(card);
    });

    itemsLeft.textContent = document.querySelectorAll(".todos .card:not(.checked)").length;
}

document.addEventListener("DOMContentLoaded", main);
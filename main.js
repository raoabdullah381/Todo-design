const form = document.querySelector("#itemform"); 
const itemInput = document.querySelector("#iteminput");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addBtn = document.querySelector("#add-item");
const clearButton = document.querySelector("#clear-list");
const clonetask = document.querySelector(".clone-item");
const movetaskup = document.querySelector(".up-item");
const movetaskdown = document.querySelector(".down-item")

let todoItems = [];

// Handle item
const handleItem = function (itemName) {
  const items = itemList.querySelectorAll(".item");

  items.forEach((item) => {
    if (
      item.querySelector(".item-name").textContent.trim().toLowerCase() ===
      itemName.trim().toLowerCase()
    ) {
      // Complete event listener
      item
        .querySelector(".complete-item")
        .addEventListener("click", function () {
          let itemText = item.querySelector(".item-name");
          let itemIndex = item.querySelector(".item-index");

          itemText.classList.toggle("completed");
          itemIndex.classList.toggle("completed");

          if (itemText.classList.contains("completed")) {
            sendFeedback("Item Completed", "green");
          }
        });

      // Edit event listener
      item.querySelector(".edit-item").addEventListener("click", function () {
        addBtn.innerHTML = "Edit Item";
        itemInput.value = itemName;
        itemList.removeChild(item);

        todoItems = todoItems.filter((item) => item !== itemName);
        setLocalStorage(todoItems);
      });

      // Delete event listener
      item.querySelector(".delete-item").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this item?")) {
          itemList.removeChild(item);

          todoItems = todoItems.filter((item) => item !== itemName);
          setLocalStorage(todoItems);
          sendFeedback("Item deleted", "red");
        }
      });

      // Clone event listener
      item.querySelector(".clone-item").addEventListener("click", function () {
        const clonedItemName = item.querySelector(".item-name").textContent;
        
        // Add cloned item to the list
        todoItems.push(clonedItemName);
        setLocalStorage(todoItems);
        getList(todoItems);

        sendFeedback("Task duplicated!", "green");
      });
      
    }
  });
};

// Get List
const getList = function (todoItems) {
  itemList.innerHTML = "";

  todoItems.forEach(function (item, index) {
    itemList.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
        <div class="item-info">
          <h6 class="item-index">${index}</h6>
          <p class="item-name">${item}</p>
        </div>
        <div class="item-icons">
        <i class="fa -sharp fa-regular fa-square-check complete-item"></i>
        <i class="fa -solid fa-pen-to-square edit-item"></i>
        <i class="fa -duotone fa-solid fa-trash delete-item"></i>
        <i class="fa -solid fa-clone clone-item"></i>
        <i class="fa -solid fa-arrow-up up-item"></i>
        <i class="fa -solid fa-arrow-down down-item"></i>
        
        </div>
      </div>`
    );
    handleItem(item);
  });
};

// Get Local Storage
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  todoItems = todoStorage ? JSON.parse(todoStorage) : [];
  getList(todoItems);
};

// Set Local Storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

// get local storage from page
getLocalStorage();

// Add an item to the List, including to local storage
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName.length === 0) {
    sendFeedback("Please Enter Valid Value", "red");
  } else {
    addBtn.innerHTML = "Add Item";
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
    sendFeedback("Item added to the list", "green");
  }

  itemInput.value = "";
});

// Clear all items from the list
clearButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear the list?")) {
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
  }
});

// Send feedback
function sendFeedback(text, className) {
  feedback.classList.add(className);
  feedback.innerHTML = text;
  setTimeout(function () {
    feedback.classList.remove(className);
    feedback.innerHTML = "Write value for item";
  }, 3000);
}

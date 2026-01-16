
console.log("hello");

const addBookButton = document.querySelector(".addButton");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = document.querySelector(".confirm");
const closeBtn = document.querySelector(".closebtn");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

closeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    addBookDialog.close();
})



const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status){

}
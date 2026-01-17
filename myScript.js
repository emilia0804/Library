const addBookButton = document.querySelector(".addButton");
const addBookDialog = document.getElementById("addBookDialog");
const confirmBtn = document.querySelector(".confirm");
const closeBtn = document.querySelector(".closebtn");
const display = document.querySelector(".library");
const modalForm = document.querySelector(".modal-form");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

closeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    addBookDialog.close();
    modalForm.reset();
})

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    const book = new Book(title,author,pages, read);
    book.id = Date.now();
    myLibrary.push(book);
}

confirmBtn.addEventListener("click",() => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#status").checked;
    addBookToLibrary(title,author,pages,read);
    displayBooks();

    modalForm.reset();
    addBookDialog.close();
});

function displayBooks(){

    display.innerHTML = "";
    // create books container
    const books = document.createElement("div");
    books.classList.add("books");

    myLibrary.forEach((book) => {
        // create card
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.dataset.id = book.id;

        // book title
        const title = document.createElement("div");
        title.classList.add("book-title");
        title.textContent = book.title;

        // author
        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = book.author;

        // pages
        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = book.pages + " pages";

        // create buttons group
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        // status button
        const status = document.createElement("button");
        status.classList.add("statusbtn");

        if(book.read){
            status.textContent = "Have Read";
            status.style.backgroundColor = "#213448";
        }else{
            status.textContent = "mark read";
        }

        status.addEventListener("click", ()=> {
            book.read = !book.read;
            displayBooks();
        })

        // remove button
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.textContent = "remove";

        buttons.appendChild(status);
        buttons.appendChild(remove);

        newCard.appendChild(title);
        newCard.appendChild(author);
        newCard.appendChild(pages);
        newCard.appendChild(buttons);

        books.appendChild(newCard);
    });
    display.appendChild(books);
}

// remove
display.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const card = e.target.closest(".card");
    const bookId = Number(card.dataset.id);
    const index = myLibrary.findIndex((item) => item.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  }
});

addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
addBookToLibrary("You Don't Know JS Yet", "Kyle Simpson", 176, true);
addBookToLibrary("JavaScript: The Good Parts", "Douglas Crockford", 634, false);
displayBooks();


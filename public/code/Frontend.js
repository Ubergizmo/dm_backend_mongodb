// fonction automatique pour récuperer les données depuis notrre api rest
const url = "http://localhost:2045/"
async function getData(suiteurl) {
    try {
        const response = await fetch(url + suiteurl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}
//fonction pour supprimer un livre
async function deleteBook(bookId) {
    try {
        const response = await fetch(`http://localhost:2045/books/${bookId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        listeLivres = await getData("books")
        BooksComponent(listeLivres);
    } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
    }
}
//fonction pour supprimer un autheur
async function deleteAuthor(authorId) {
    try {
        const response = await fetch(`http://localhost:2045/authors/${authorId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        listeAutheurs = await getData("authors")
        AuthorsComponent(listeAutheurs);
    } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
    }
}
// Page Dynamique Html pour mettre à jour un auteur
async function UpdateAuthorComponent(tmp_id) {
    const appSection = document.getElementById("app");

    const authorsListHTML = `
    <div class="flexBox">
        <label for="first_name">First Name</label>
        <input type="text" name="first_name" />
        <label for="familly_name">Family Name</label>
        <input type="text" name="familly_name" />
        <label for="date_of_birth">Date of Birth</label>
        <input type="date" name="date_of_birth" />
        <label for="date_of_death">Date of Death</label>
        <input type="date" name="date_of_death" />
        <button onClick="updateAuthor('${tmp_id}')">Submit</button>
    </div>
    `;
    appSection.innerHTML = authorsListHTML;
}
// Fonction pour mettre à jour un auteur
async function updateAuthor(tmp_id) {
    const firstName = document.querySelector('input[name="first_name"]').value;
    const familyName = document.querySelector('input[name="familly_name"]').value;
    const dateOfBirth = document.querySelector('input[name="date_of_birth"]').value;
    const dateOfDeath = document.querySelector('input[name="date_of_death"]').value;

    if (!firstName || !familyName || !dateOfBirth) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const formDatas = {
        first_name: firstName,
        familly_name: familyName,
        date_of_birth: dateOfBirth,
        date_of_death: dateOfDeath,
    };

    try {
        const response = await fetch(`http://localhost:2045/authors/${tmp_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDatas)
        });

        listeAutheurs = await getData("authors");
        AuthorsComponent(listeAutheurs);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'auteur:', error);
    }
}
// Page Dynamique Html pour mettre à jour un auteur
async function UpdateBookComponent(tmp_id) {
    const appSection = document.getElementById("app");
    listeAutheurs = await getData("authors")
    const authorsListHTML = `
    <div class="flexBox">
    <label for="title">Title</label>
    <input type="text" name="title" />
    <label for="author-select">Author:</label>
    <select name="author" id="author-select">
    <option value="">--Choose an author--</option>
    ${listeAutheurs.autheurs.map((author) =>
        `<option value="${author._id}">${author.first_name} ${author.familly_name}</option>`
    )}
    </select>
    <label for="summary">Summary</label>
    <input type="text" name="summary" />
    <label for="isbn">ISBN</label>
    <input type="text" name="isbn" id="isbn" pattern="\d+" title="uniquement des chiffres!!"  />
    <button onClick="updateBook('${tmp_id}')">Submit</button>
</div> `;
    appSection.innerHTML = authorsListHTML;
}
// Fonction pour mettre à jour un auteur
async function updateBook(tmp_id) {
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('select[name="author"]').value;
    const summary = document.querySelector('input[name="summary"]').value;
    const isbn = document.querySelector('input[name="isbn"]').value;

    if (!title || !author || !summary || !isbn) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }
    const isbnRegex = /^\d+$/;
    if (!isbnRegex.test(isbn)) {
        alert("uniquement des chiffres pour l'ISBN.");
        isbnInput.focus();
        return;
    }
    const formDatas = {
        title: title,
        author: author,
        summary: summary,
        isbn: isbn,
    };

    try {
        const response = await fetch(`http://localhost:2045/books/${tmp_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDatas)
        });

        listeLivres = await getData("books")
        BooksComponent(listeLivres);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre:', error);
    }
}
// Fonction pour ajouter un auteur
async function addAuthor() {
    const firstName = document.querySelector('input[name="first_name"]').value;
    const familyName = document.querySelector('input[name="familly_name"]').value;
    const dateOfBirth = document.querySelector('input[name="date_of_birth"]').value;
    const dateOfDeath = document.querySelector('input[name="date_of_death"]').value;

    if (!firstName || !familyName || !dateOfBirth) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const formDatas = {
        first_name: firstName,
        familly_name: familyName,
        date_of_birth: dateOfBirth,
        date_of_death: dateOfDeath,
    };

    try {
        const response = await fetch(`http://localhost:2045/authors/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDatas)
        });

        listeAutheurs = await getData("authors");
        AuthorsComponent(listeAutheurs);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'auteur:', error);
    }
}
// Fonction pour ajouter un livre
async function addBook() {
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('select[name="author"]').value;
    const summary = document.querySelector('input[name="summary"]').value;
    const isbn = document.querySelector('input[name="isbn"]').value;

    if (!title || !author || !summary || !isbn) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }
    const isbnRegex = /^\d+$/;
    if (!isbnRegex.test(isbn)) {
        alert("uniquement des chiffres pour l'ISBN.");
        isbnInput.focus();
        return;
    }
    const formDatas = {
        title: title,
        author: author,
        summary: summary,
        isbn: isbn,
    };

    try {
        const response = await fetch(`http://localhost:2045/books/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDatas)
        });

        listeLivres = await getData("books")
        BooksComponent(listeLivres);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre:', error);
    }
}
Promise.all([getData("books"), getData("authors")])
    .then(([totalLivres, totalAutheurs]) => {
        HomeComponent(totalLivres, totalAutheurs);
    })
    .catch(error => console.error("Erreur lors de la récupération des données :", error));
//-----Variables-------
let totalLivres = "";
let totalAutheurs = "";
let listeLivres = {};
let listeAutheurs = {};
let tmp_id = "";
//---------------------
//Page Dinamique Html pour la page d'accueil
function HomeComponent(totalLivres, totalAutheurs) {
    const appSection = document.getElementById("app");

    // Mettre à jour le contenu HTML en fonction des données récupérées
    appSection.innerHTML = `
        <h1>Local Library Home</h1>
        <p>Welcome to <i>LocalLibrary</i>, a very basic Express website developed as a tutorial</p>
        <h1>Dynamic content</h1>
        <p>The library has the following record counts:</p>
        <ul>
            <li class='list'>
                Books: ${totalLivres.totalLivres}
            </li>
            <li class='list'>
                Authors: ${totalAutheurs.totalAutheurs}
            </li>
        </ul>
    `;
}
//Page Dinamique Html pour la page des livres
async function BooksComponent(listeLivres) {
    const appSection = document.getElementById("app");

    if (listeLivres && listeLivres.totalLivres > 0) {
        // Récupérer les détails de l'auteur pour chaque livre
        const booksWithAuthorDetails = await Promise.all(
            listeLivres.livres.map(async (book) => {
                const authorDetails = await getData(`authors/${book.author}`);
                return {
                    ...book,
                    authorDetails: authorDetails
                };
            })
        );

        const booksListHTML = `<h1>Book list</h1>
                               <ul>
                                   ${booksWithAuthorDetails.map((book) => `
                                       <li class="list elemlivre" id='elemlivre' data-id= "${book._id}" >
                                           ${book.title} (${book.authorDetails.first_name} ${book.authorDetails.familly_name})
                                       </li>`).join('')}
                               </ul>`;
        appSection.innerHTML = booksListHTML;
    } else {
        appSection.innerHTML = "<p>Aucun Livre</p>";
    }
}
//Page Dinamique Html pour la page pour un seul livre
async function OneBookComponent(livreDatas) {
    const appSection = document.getElementById("app");
    const autheurDatas = await getData(`authors/${livreDatas.author}`);
    if (livreDatas) {
        tmp_id = livreDatas._id;
        const bookHTML = `<h1>TITLE: ${livreDatas.title}</h1>
        <p class="elemautheur livretitre" data-id="${autheurDatas._id}">Author: ${autheurDatas.first_name}, ${autheurDatas.familly_name}</p>
        <p>Summary: ${livreDatas.summary}</p>
        <p>ISBN: ${livreDatas.isbn}</p>
        <button onclick="deleteBook('${livreDatas._id}')">Delete Book</button>
        <button onclick="UpdateBookComponent('${tmp_id}')">Update Book</button>
                            `;
        appSection.innerHTML = bookHTML;
    } else {
        appSection.innerHTML = "<p>Aucun resultat</p>";
    }
}
//Page Dinamique Html pour la page des autheurs
function AuthorsComponent(listeAutheurs) {
    const appSection = document.getElementById("app");
    if (listeAutheurs && listeAutheurs.totalAutheurs > 0) {
        const authorsListHTML = `
        <h1>Author list</h1>
        <ul>
        ${listeAutheurs.autheurs.map((author) => `<li class="list elemautheur" id = "elemautheur" data-id="${author._id}">${author.familly_name} ${author.first_name} (${author.date_of_birth}/${author.date_of_death})</li> `).join('')}
        </ul>
        `;
        appSection.innerHTML = authorsListHTML;
    } else {
        appSection.innerHTML = "<p>Aucun Autheur</p>"
    }
}
//Page Dinamique Html pour la page pour un seul autheur
function OneAuthorComponent(autheurDatas, autheurLivres) {
    const appSection = document.getElementById("app");

    if (autheurDatas) {
        tmp_id = autheurDatas._id;
        const bookHTML = `<h1>Author: ${autheurDatas.first_name} ${autheurDatas.familly_name}</h1>
        <p>${autheurDatas.date_of_birth}</p>
        <p>${autheurDatas.date_of_death}</p>
        ${autheurLivres.length > 0 ? "<p>Books:</p>" : "<p>Aucun livre</p>"}
        <ul>
        ${autheurLivres.map((book) => `<p class=" elemlivre livretitre" id = "elemautheur" data-id="${book._id}">${book.title}</p> <p class=" elemlivre livresummary" id = "elemautheur" data-id="${book._id}">${book.summary}</p> `).join('')}       
        </ul>
        <button onclick="deleteAuthor('${autheurDatas._id}')">Delete Author</button>
        <button onclick="UpdateAuthorComponent('${tmp_id}')">Update Author</button>
                            `;
        appSection.innerHTML = bookHTML;
    } else {
        appSection.innerHTML = "<p>Aucun resultat</p>";
    }
}
//Page Dinamique Html pour la page des ajouter nouveaux autheurs
function NewAuthorsComponent() {
    const appSection = document.getElementById("app");

    const authorsListHTML = `
    <div class="flexBox">
    <label for="first_name">First Name</label>
    <input type="text" name="first_name" />
    <label for="familly_name">Family Name</label>
    <input type="text" name="familly_name" />
    <label for="date_of_birth">Date of Birth</label>
    <input type="date" name="date_of_birth" />
    <label for="date_of_death">Date of Death</label>
    <input type="date" name="date_of_death" />
    <button onClick="addAuthor()">Submit</button>
</div>
        `;
    appSection.innerHTML = authorsListHTML;
}
//Page Dinamique Html pour la page des ajouter nouveaux livres
async function NewBooksComponent() {
    const appSection = document.getElementById("app");
    listeAutheurs = await getData("authors")
    const authorsListHTML = `
    <div class="flexBox">
    <label for="title">Title</label>
    <input type="text" name="title" />
    <label for="author-select">Author:</label>
    <select name="author" id="author-select">
    <option value="">--Choose an author--</option>
    ${listeAutheurs.autheurs.map((author) =>
        `<option value="${author._id}">${author.first_name} ${author.familly_name}</option>`
    )}
    </select>
    <label for="summary">Summary</label>
    <input type="text" name="summary" />
    <label for="isbn">ISBN</label>
    <input type="text" name="isbn" id="isbn" pattern="\d+" title="uniquement des chiffres!!"  />
    <button onClick="addBook()">Submit</button>
</div> `;
    appSection.innerHTML = authorsListHTML;
}
//On recupère le id d'un élément pour pouvoir recupérer les données de notre api
document.getElementById("app").addEventListener("click", async function (event) {
    const targetElement = event.target;

    if (targetElement.classList.contains('elemlivre')) {
        const bookId = targetElement.getAttribute('data-id');
        const livreDatas = await getData(`books/${bookId}`);
        OneBookComponent(livreDatas);
    }

    if (targetElement.classList.contains('elemautheur')) {
        const authorId = targetElement.getAttribute('data-id');
        const autheurDatas = await getData(`authors/${authorId}`);
        const autheurLivres = await getData(`books/authors/${authorId}`);
        OneAuthorComponent(autheurDatas, autheurLivres.authorBooks);
    }
});
//Fonction qui affiche la page home
document.getElementById("home").addEventListener("click", async function () {
    Promise.all([getData("books"), getData("authors")])
        .then(([totalLivres, totalAutheurs]) => {
            HomeComponent(totalLivres, totalAutheurs);
        })
        .catch(error => console.error("Erreur lors de la récupération des données :", error));
});
//Fonction qui affiche la page livre list
document.getElementById("books").addEventListener("click", async function () {
    listeLivres = await getData("books")
    BooksComponent(listeLivres);
});
//Fonction qui affiche la page autheur list
document.getElementById("authors").addEventListener("click", async function () {
    listeAutheurs = await getData("authors")
    AuthorsComponent(listeAutheurs);
});
//Fonction qui affiche la page pour créer un livre
document.getElementById("create-book").addEventListener("click", function () {
    NewBooksComponent();
});
//Fonction qui affiche la page pour créer un autheur
document.getElementById("create-author").addEventListener("click", function () {
    NewAuthorsComponent();
});
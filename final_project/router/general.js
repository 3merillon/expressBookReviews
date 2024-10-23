const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Register the new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop using async-await with Axios
/*public_users.get('/', async function (req, res) {
  try {
    // Since we're fetching from the same server, we can directly use the books variable
    const booksList = books;

    // Use JSON.stringify to format the output neatly and set status to 200
    res.status(200).send(JSON.stringify(booksList, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});*/

// Get the book list available in the shop using Promises
public_users.get('/', function (req, res) {
  // Simulate an asynchronous operation with a Promise and setTimeout
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 2000); // Simulate a 2-second delay
  })
  .then((booksList) => {
    // Use JSON.stringify to format the output neatly and set status to 200
    res.status(200).send(JSON.stringify(booksList, null, 4));
  })
  .catch((error) => {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  });
});

// Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  // Simulate an asynchronous operation with a Promise and setTimeout
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found"));
      }
    }, 2000); // Simulate a 2-second delay
  })
  .then((book) => {
    // Use JSON.stringify to format the output neatly and set status to 200
    res.status(200).send(JSON.stringify(book, null, 4));
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });
  });
});
  
// Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();

  // Simulate an asynchronous operation with a Promise and setTimeout
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase().includes(author));
      if (booksByAuthor.length > 0) {
        resolve(booksByAuthor);
      } else {
        reject(new Error("No books found by this author"));
      }
    }, 2000); // Simulate a 2-second delay
  })
  .then((booksByAuthor) => {
    // Use JSON.stringify to format the output neatly and set status to 200
    res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });
  });
});

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();

  // Simulate an asynchronous operation with a Promise and setTimeout
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByTitle = Object.values(books).filter(book => book.title.toLowerCase().includes(title));
      if (booksByTitle.length > 0) {
        resolve(booksByTitle);
      } else {
        reject(new Error("No books found with this title"));
      }
    }, 2000); // Simulate a 2-second delay
  })
  .then((booksByTitle) => {
    // Use JSON.stringify to format the output neatly and set status to 200
    res.status(200).send(JSON.stringify(booksByTitle, null, 4));
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book && book.reviews) {
    res.status(200).send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports.general = public_users;

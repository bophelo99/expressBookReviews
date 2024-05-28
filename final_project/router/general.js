const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

  
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
     const list = JSON.stringify({books}, null, 4)
     if(!list) {
       reject('no books found');
     } else {
       resolve(list);
     }
    }, 2000);
   });
   
   promise.then(function(result) {
    console.log(result);
    res.send(result);
   });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here]
  public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        const isbn = req.params.isbn;
             let book = Object.values(books).filter((book)=>book.isbn==isbn);
       if(book) {
         reject('no books found');
       } else {
         resolve(book);
       }
      }, 2000);
     });
     
     promise.then(function(result) {
      console.log(result);
      res.send(result);
     });
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      const author = req.params.author;
      let book = Object.values(books).filter((book)=> book.author===author);
     if(book) {
       reject('no books found');
     } else {
       resolve(book);
     }
    }, 2000);
   });
   
   promise.then(function(result) {
    console.log(result);
    res.send(result);
   });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here]
    public_users.get('/author/:author',function (req, res) {
      //Write your code here
      const promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
   
          const title = req.params.title;
          let book = Object.values(books).filter((book) => book.title === title);
         if(book) {
           reject('no books found');
         } else {
           resolve(book);
         }
        }, 2000);
       });
       
       promise.then(function(result) {
        console.log(result);
        res.send(result);
       });
    });
   });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  let book = Object.values(books).filter((book)=>book.isbn==isbn);
  let review = book["reviews"];
  res.send(JSON.stringify({review},null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

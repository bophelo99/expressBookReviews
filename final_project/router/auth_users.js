const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { "username":"test","password":"test123"}
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let usersamename = users.filter((user)=>{
  return user.usersamename === username
});
if(usersamename.length>0){
  return true;
} else {
  return false;
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }

  //return res.status(300).json({message: "Yet be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let book = Object.values(books).filter((book)=>book.isbn==isbn);
  if(book>0){
   let filteredbook=book[0];
   let review=req.query.review;
   if(review){
      filteredbook.reviews = {review}}
      res.status(200).json({message:`The review for the book with ISBN ${isbn} has been updated/added.`});
   
      books = Object.values(books).filter((book) => book.isbn != isbn);
      books.push(filteredbook);
      res.send(`The review for the book with ISBN ${isbn} has been updated/added.`);
   }
   else{
    res.send(`The review for the book with ISBN ${isbn} has been updated/added.`);
   // res.send("Unable to find book!");
   }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  book = Object.values(books).filter((book) => book.isbn == isbn);
  book.reviews={};
  books = Object.values(books).filter((book) => book.isbn != isbn);
  books.push(book);
  res.send(`Review for ISBN 1 posted by the user test deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

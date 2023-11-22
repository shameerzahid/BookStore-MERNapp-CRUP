const Book = require('../Models/bookModel')


const createBook = async(req,res) =>{
    try{
const {title, author , genre, publishedYear} = req.body;

if(!title || !author || !genre || !publishedYear) {
    return res.status(400).json({message:"Fill all Fields Properly"})
   
}

if (isNaN(publishedYear)) {
    return res.status(400).json({ message: "Published Year should be a number" });
    
  }

const newBook = await  Book.create(
  {  title,
    author,
    genre,
    publishedYear}
)

if(newBook){
    res.status(200).json({message:"Book Created Successfully"})
}else{
    res.status(401).json({message:"Cannot Create the Book"})
}}catch(err){
    res.status(500).json({error:"Internal Server error"})
}


}

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


const getAllBook = async(req,res) =>{

    try {
        const books = await Book.find();
    
        if (books && books.length > 0) {
          res.status(200).json({books});
        } else {
          res.status(404).json({ message: "No books found" });
        }
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});
      }


}

const getSingleBook = async(req,res) =>{

    try{
        const book = await Book.findById(req.params.id);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({book});

    }catch(err){
        res.status(500).json({ error: "Internal Server Error"});
    }
}

const updateBook = async(req,res) =>{
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title && !author && !genre && !publishedYear) {
            return res.status(400).json({ message: 'Nothing to update. Please provide data to update' });
          }
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          { title, author, genre, publishedYear },
          { new: true }
        );
        if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({message:"Book Updated Successfully"});
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const deleteBook = async(req,res) =>{

    try {
        const deletedBook = await Book.findByIdAndRemove(req.params.id);
        if (!deletedBook) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});
      }


}
module.exports ={createBook , getAllBook,getSingleBook,updateBook, deleteBook};
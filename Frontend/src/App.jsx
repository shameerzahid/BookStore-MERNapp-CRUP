import AddBook from './components/Books/AddBook/AddBook';
import AllBooks from './components/Books/AllBooks/AllBooks';
import UpdateBook from './components/Books/UpdateBook/UpdateBook';
import ViewBook from './components/Books/ViewBook/ViewBook';
import MainPage from './components/MainPage/MainPage'

import { Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
    <Routes>
      <Route path='/*' element={<MainPage/>}/>
      <Route path='/add-book' element={<AddBook/>}/>
      <Route path='/check-all-books' element={<AllBooks/>}/>
      <Route path="/books/:id" element={<ViewBook/>}/>
      <Route path="/update/:id" element={<UpdateBook/>}/>

    

      </Routes>
    </>
  )
}

export default App

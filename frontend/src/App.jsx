import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import CreateNotes from './pages/CreateNotes.jsx';
import ShowNotes from './pages/ShowNotes.jsx';
import EditNotes from './pages/EditNotes.jsx';
import DeleteNotes from './pages/DeleteNotes.jsx';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/notes/create' element={<CreateNotes />} />
      <Route path='/notes/details/:id' element={<ShowNotes />} />
      <Route path='/notes/edit/:id' element={<EditNotes />} />
      <Route path='/notes/delete/:id' element={<DeleteNotes />} />


    </Routes>

  );
};

export default App;
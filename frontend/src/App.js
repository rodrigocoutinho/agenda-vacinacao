import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import User from './components/User';
import Alergia from './components/Alergia';
import Usuarios from './components/Usuarios';
import Vacina from './components/Vacina';
import Agenda from './components/Agenda';
import Wellcome from './components/Wellcome';
import Navbar from './components/Navbar';
import Layout from './components/Layout';


function App() {
  return (
    <div className="App">
      <Navbar/>
       <Routes>
          <Route path="/" element={[<Layout/>,<Wellcome/>]}/>
          <Route path="/alergias" element={[<Layout/>, <Alergia/>]}/>
          <Route path="/user" element={[<Layout/>, <User/>]}/>
          <Route path="/usuarios" element={[<Layout/>, <Usuarios/>]}/> 
          <Route path="/vacina" element={[<Layout/>, <Vacina/>]}/> 
          <Route path="/agenda" element={[<Layout/>, <Agenda/>]}/> 
          <Route path="/wellcome" element={[<Layout/>,<Wellcome/>]}/> 
       </Routes>
    </div>
  );
}

export default App;

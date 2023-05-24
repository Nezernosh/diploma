import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login, Register, Logout } from './pages/auth';
import { About } from './components/about/About';
import { Feedback } from './components/feedback/Feedback';
import { Account } from './pages/account/Account';
import { Categories } from './components/categories/Categories';
import { Structures, Graphs, Sorts, Searches } from './components/themes';
import { Structure, Graph, Sort, Search } from './components/articles';
import { PageNotFound } from './components/not_found/PageNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='logout' element={<Logout />} />
          <Route path='account' element={<Account />} />
          <Route path='about' element={<About />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='categories' element={<Categories />} />
          <Route path='categories/graphs'>
            <Route index element={<Graphs />} />
            <Route path=':lessonId' element={<Graph />} />
          </Route>
          <Route path='categories/sorts'>
            <Route index element={<Sorts />} />
            <Route path=':lessonId' element={<Sort />} />
          </Route>
          <Route path='categories/searches'>
            <Route index element={<Searches />} />
            <Route path=':lessonId' element={<Search />} />
          </Route>
          <Route path='categories/structures'>
            <Route index element={<Structures />} />
            <Route path=':lessonId' element={<Structure />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

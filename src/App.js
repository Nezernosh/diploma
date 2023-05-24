import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Logout } from './pages/auth/Logout';
import { About } from './components/about/About';
import { Feedback } from './components/feedback/Feedback';
import { Account } from './pages/account/Account';
import { Categories } from './components/categories/Categories';
import { Graphs } from './components/themes/Graphs';
import { Sorts } from './components/themes/Sorts';
import { Search } from './components/themes/Search';
import { Structures } from './components/themes/Structures';
import { Articles } from './components/articles/Articles';


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
          <Route path='categories/graphs' element={<Graphs />} />
          <Route path='categories/sorts' element={<Sorts />} />
          <Route path='categories/search' element={<Search />} />
          <Route path='categories/structures' element={<Structures />} />
          <Route
            // this path will match URLs like
            // - /teams/hotspur
            // - /teams/real
            path="/categories/structures/:lessonId"
            // the matching param will be available to the loader
            loader={({ params }) => {
              console.log(params.lessonId); // "hotspur"
            }}
            // and the action
            action={({ params }) => { }}
            element={<Articles />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


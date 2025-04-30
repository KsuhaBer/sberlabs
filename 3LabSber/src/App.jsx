import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Lab1, Lab2, Lab3 } from './pages/Lab1';
import './App.css';

function App() {
  const [selectedLab, setSelectedLab] = useState(null);

  const labs = [
    {
      title: 'Лабораторная работа 1',
      path: '/lab1',
      component: <Lab1 />,
      content: 'Содержимое лабораторной работы 1'
    },
    {
      title: 'Лабораторная работа 2',
      path: '/lab2',
      component: <Lab2 />,
      content: 'Содержимое лабораторной работы 2'
    },
    {
      title: 'Лабораторная работа 3',
      path: '/lab3',
      component: <Lab3 />,
      content: 'Содержимое лабораторной работы 3'
    },
  ];

  const handleLabSelect = (index) => {
    setSelectedLab(labs[index]);
  };

  return (
    <div className="app">
      <Header />
      <Navbar />
      <div className="main-content">
        <Menu labs={labs} onLabSelect={handleLabSelect} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {labs.map((lab, index) => (
              <Route 
                key={index} 
                path={lab.path} 
                element={lab.component} 
              />
            ))}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
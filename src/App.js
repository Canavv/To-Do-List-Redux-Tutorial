import React from 'react';

import './App.css';
import Header from './features/header/Header';
import TodoList from './features/todos/TodoList';
import Footer from './features/footer/Footer';

function App() {
  return (
  <>
    <div className="App">
      <nav>
        <h1>Redux Example</h1>
      </nav>
    </div>
    <h2>TodoList</h2>
    <div className='todoapp'>
      <Header />
      <TodoList />
      <Footer />
    </div>
  </>
  );
}

export default App

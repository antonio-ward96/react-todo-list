import * as React from 'react';
import './App.css';
import background from './assets/backgground.jpg';
import ToDoList from './components/ToDoList';
import ToDosProvider from './contexts/toDosContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToDosProvider>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#191b1f",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ToDoList />
        </div>
      </ToastProvider>
    </ToDosProvider>
  );
}

export default App;

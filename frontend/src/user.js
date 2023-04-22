import React from 'react';
import ReactDOM from 'react-dom/client';



function welcome() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }

const container = document.getElementById('root');
const root = ReactDOM.createRoot(<welcome />);
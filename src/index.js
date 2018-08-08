import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <div className="top-bar-new">
          <div className="container">Recipe Box</div>
        </div>
    <App />,
  </div>
  
  document.getElementById('root')
);
registerServiceWorker();

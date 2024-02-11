import React from 'react';
import ReactDOM from 'react-dom';
import { CategoryProvider } from './context/category-context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { CategoryProvider } from './context/index';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <CategoryProvider>  
//       <App />
//     </CategoryProvider>  
//   </React.StrictMode>
// );


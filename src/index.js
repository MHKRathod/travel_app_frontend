import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { CategoryProvider,DateProvider, FilterProvider } from './context/index';
import App from './App';

ReactDOM.render(
   
    <Router>
      <CategoryProvider>
        <DateProvider>
          <FilterProvider>
              <App />
          </FilterProvider>
        </DateProvider>
      </CategoryProvider>
    </Router>,

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


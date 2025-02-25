// import 'bootstrap/dist/css/bootstrap.min.css';import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// //import * as serviceWorker from './serviceWorker';
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import reportWebVitals from "./reportWebVitals";
// import 'bootstrap-icons/font/bootstrap-icons.css';

// import { LogoProvider } from './Context/LogoContext';
// // import SimpleReactLightbox from "simple-react-lightbox";

// //ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <LogoProvider>
//       <Router>
//         <App />
//         
//       </Router>
//       </LogoProvider>

//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
// reportWebVitals();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// //serviceWorker.unregister();
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import { LogoProvider } from './Context/LogoContext';

// Create root instead of using ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LogoProvider>
        <Router>
          <App />
          <ToastContainer position="top-right" autoClose={3000}/>
        </Router>
      </LogoProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

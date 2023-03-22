import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

let url = window.location.href;

if (url.includes("?")) {
    // check if "page" parameter exists
    if (url.includes("page=")) {
        console.log(url.split("page=")[1]);
        fetch('http://localhost:2000/api/page/' + url.split("page=")[1])
            .then(response => response.text())
            .then(data => {
                console.log(data);
                root.render(
                    <React.StrictMode>
                        <App data={data} />
                    </React.StrictMode>
                );
            }
            );
    }
}
else {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

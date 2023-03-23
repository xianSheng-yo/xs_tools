import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { getURLParameter, parseURLQueryParamsToObject, parseURLQueryParamsToString } from 'xs_tools';

function App() {
  useEffect(() => {
    console.log('getURLParameter', getURLParameter('name'));
    const urlValue = parseURLQueryParamsToObject(window.location.href);
    urlValue.bas = undefined;
    console.log('urlValue', urlValue);
    console.log('parseURLQueryParamsToString', parseURLQueryParamsToString(urlValue));
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

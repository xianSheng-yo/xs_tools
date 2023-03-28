import React, { useEffect } from 'react';
import { getComment } from './serves/axios';

function App() {
  useEffect(() => {
    getComment()
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        console.log('err: ', err.toString());
      });
  }, []);

  return <div className="App"></div>;
}

export default App;

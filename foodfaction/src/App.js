import React, { useState, useEffect } from 'react';
// import Loader from './Components/loader';
import Header from './Components/header';
// import Sample from './Components/sample';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {/* <Sample/> */}
      {/* {/* {loading ? <Loader /> : <Header />} */ <Header />}
    </>
  );
}

export default App;
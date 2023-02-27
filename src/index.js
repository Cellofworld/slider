import React from 'react';
import ReactDOM from 'react-dom/client';
import Slider from './Slide';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Slider />
    <Slider width={800} height={400} autoPlay={true} autoPlayTime={1000}/>
  </React.StrictMode>
);


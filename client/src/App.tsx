import React, { useEffect, useState }from 'react';
import { useEmissions } from './hooks/useEmissions';
import { BrowserRouter, Routes, Route } from "react-router-dom";

type Props = {};

const Home = () => {
  return (
    <h1>welcome to the home</h1>
  )
}


const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
};


export default App;

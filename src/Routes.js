import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Graph from './pages/Graph';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

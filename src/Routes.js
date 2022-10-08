import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
<<<<<<< HEAD
import Graph from './pages/Graph';
import Test from './pages/Test';
=======
import Graph from './pages/graph/Graph';
>>>>>>> a743f4e3ee4cd36d79f5e81c224d826dcdcaa29e

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

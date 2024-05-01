import React from "react";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import setupStore from "../../client/store";


export default function renderMaster(Component){
  return render(
    <Provider store={setupStore()}>
      <Router>
        <Routes>
          <Route path="/" element={<Component />} />
        </Routes>
      </Router>
    </Provider>
  );
}
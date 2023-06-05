import React from 'react'
import Tag from './Tag';
import { DOMMessageResponse } from './types'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
    return (
        <Router>
              <Routes>
                <Route
                  path="tag"
                  element={<Tag />}
                />
              </Routes>
            </Router>
    )
}

export default App

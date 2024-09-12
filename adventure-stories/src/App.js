import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoriesList from './components/StoriesList';
import StoryDetail from './components/StoryDetail';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StoriesList />} />
                <Route path="/story/:id" element={<StoryDetail />} />
            </Routes>
        </Router>
    );
};

export default App;

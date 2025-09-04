import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrainerProvider } from './context/TrainerContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import TeamPage from './pages/TeamPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <TrainerProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemon/:id" element={<DetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TrainerProvider>
  );
}

export default App;
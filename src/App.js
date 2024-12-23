import React from 'react';
import Header from './components/Header';
import ClientsList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import VoituresList from './components/VoitureList';
import VoitureDetails from './components/VoitureDetails';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">
                  Welcome to Car Management System
                </h1>
                <p className="text-xl text-gray-600">
                  Manage your clients and vehicles with ease
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <Link 
                    to="/clients" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    View Clients
                  </Link>
                </div>
              </div>
            } 
          />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/voitures/client/:clientId" element={<VoituresList />} />
          <Route path="/voitures/:id" element={<VoitureDetails />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
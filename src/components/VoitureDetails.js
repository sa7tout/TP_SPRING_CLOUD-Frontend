import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VoitureDetails = () => {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8888/voitures/${id}`)
      .then(response => {
        setVoiture(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch voiture details');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  if (!voiture) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-white">{voiture.model}</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
            <p className="text-gray-600">{voiture.brand}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
            <p className="text-gray-600">{voiture.year || 'Not provided'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
            <p className="text-gray-600">{voiture.color || 'Not provided'}</p>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Link 
              to="/voitures" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Back to Voitures List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoitureDetails;

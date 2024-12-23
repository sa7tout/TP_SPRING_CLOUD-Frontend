import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8888/clients/${id}`)
      .then(response => {
        setClient(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch client details');
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

  if (!client) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-4xl font-bold">{client.nom}</h2>
        </div>
        <div className="bg-white p-6 text-gray-700 rounded-b-lg">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <p>{client.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Address</label>
            <p>{client.address || 'Not provided'}</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <Link 
              to="/clients" 
              className="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Back to Clients List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;

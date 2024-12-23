import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({ nom: '', age: '' });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8888/clients');
      setClients(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch clients');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8888/clients', {
        ...newClient,
        age: parseInt(newClient.age),
      });
      setNewClient({ nom: '', age: '' });
      setShowForm(false);
      fetchClients();
    } catch (error) {
      setError('Failed to create client');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`http://localhost:8888/clients/${id}`);
        fetchClients();
      } catch (error) {
        setError('Failed to delete client');
      }
    }
  };

  const handleViewVoitures = (clientId) => {
    navigate(`/voitures/client/${clientId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-indigo-700">Clients List</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          {showForm ? 'Cancel' : 'Add New Client'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              value={newClient.nom}
              onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
              className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Age:</label>
            <input
              type="number"
              value={newClient.age}
              onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
              className="border rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Create Client
          </button>
        </form>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div key={client.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
            <div>
              <h3 className="text-xl font-semibold text-indigo-600">{client.nom}</h3>
              <p className="text-gray-600">Age: {client.age}</p>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => handleViewVoitures(client.id)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-300 flex-1"
              >
                View Cars
              </button>
              <button
                onClick={() => handleDelete(client.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {clients.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No clients found</p>
      )}
    </div>
  );
};

export default ClientsList;

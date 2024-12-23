import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VoituresList = () => {
  const [voitures, setVoitures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newVoiture, setNewVoiture] = useState({
    marque: '',
    model: '',
    matricule: '',
    clientId: ''
  });
  const { clientId } = useParams();

  useEffect(() => {
    fetchVoitures();
  }, [clientId]);

  const fetchVoitures = async () => {
    try {
      const url = clientId 
        ? `http://localhost:8888/voitures/client/${clientId}`
        : 'http://localhost:8888/voitures';
      const response = await axios.get(url);
      setVoitures(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch voitures');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8888/voitures', {
        ...newVoiture,
        clientId: clientId || newVoiture.clientId
      });
      setNewVoiture({ marque: '', model: '', matricule: '', clientId: '' });
      setShowForm(false);
      fetchVoitures();
    } catch (error) {
      console.error('Error creating voiture:', error);
      setError('Failed to create voiture');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`http://localhost:8888/voitures/${id}`);
        fetchVoitures();
      } catch (error) {
        console.error('Error deleting voiture:', error);
        setError('Failed to delete voiture');
      }
    }
  };

  if (isLoading) return <div className="animate-spin">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {clientId ? `Cars for Client ${clientId}` : 'All Cars'}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          {showForm ? 'Cancel' : 'Add New Car'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Marque:
            </label>
            <input
              type="text"
              value={newVoiture.marque}
              onChange={(e) => setNewVoiture({ ...newVoiture, marque: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Model:
            </label>
            <input
              type="text"
              value={newVoiture.model}
              onChange={(e) => setNewVoiture({ ...newVoiture, model: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Matricule:
            </label>
            <input
              type="text"
              value={newVoiture.matricule}
              onChange={(e) => setNewVoiture({ ...newVoiture, matricule: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition duration-300"
            >
              Create Car
            </button>
          </div>
        </form>
      )}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voitures.map(voiture => (
          <div key={voiture.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold">{voiture.model}</h3>
            <p>Brand: {voiture.marque}</p>
            <p>Matricule: {voiture.matricule}</p>
            <div className="mt-4">
              <button
                onClick={() => handleDelete(voiture.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoituresList;

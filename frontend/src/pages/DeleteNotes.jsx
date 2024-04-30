import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-md mx-auto p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-400">
                <h2 className="text-xl font-semibold text-center text-yellow-800 mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 mb-4">Are you absolutely sure you want to delete this note?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
                        onClick={handleDelete}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteNotes;

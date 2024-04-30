import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { BsClock, BsPencil } from 'react-icons/bs'; // Import clock and pencil icons

const ShowNotes = () => {
    const [note, setNote] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/notes/${id}`)
            .then((response) => {
                setNote(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching note:', error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'> Show Note </h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='border border-gray-300 bg-yellow-100 rounded-md p-4'>
                    <div className='flex justify-between items-center mb-2'>
                        <h2 className='text-lg font-bold'>Note Details</h2>
                        <div className='flex items-center'>
                            <BsClock className='text-gray-500 mr-1' />
                            <span className='text-xs text-gray-500'>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className='my-2'>
                        <div className='flex items-center mb-1'>
                            <BsPencil className='text-gray-500 mr-1' />
                            <h3 className='text-base font-semibold'>Title:</h3>
                        </div>
                        <p className='text-sm text-pink-600 font-bold'>{note.title}</p>
                    </div>
                    <div className='my-2'>
                        <div className='flex items-center mb-1'>
                            <BsPencil className='text-gray-500 mr-1' />
                            <h3 className='text-base font-semibold'>Content:</h3>
                        </div>
                        <p className='text-sm text-green-600 font-semibold'>{note.content}</p>
                    </div>
                    <div className='my-2'>
                        <div className='flex items-center mb-1'>
                            <BsPencil className='text-gray-500 mr-1' />
                            <h3 className='text-base font-semibold'>Tags:</h3>
                        </div>
                        <p className='text-sm text-blue-600'>{note.tags && note.tags.join(', ')}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowNotes;

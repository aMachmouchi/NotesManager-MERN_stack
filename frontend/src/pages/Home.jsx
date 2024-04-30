import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NotesTable from '../components/home/NotesTable';
import NotesCard from '../components/home/NotesCard';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('card'); 

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5000/notes')
            .then((response) => {
                setNotes(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex justify-center items-center space-x-4 mb-6'>
                <button className='btn btn-primary' onClick={() => setShowType('card')}>
                    Cards
                </button>
                <button className='btn btn-primary' onClick={() => setShowType('table')}>
                   Table
                </button>
            </div>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Notes List</h1>
                <Link to='/notes/create' className='text-sky-800'>
                    <MdOutlineAddBox className='text-4xl' />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'card' ? <NotesCard notes={notes} /> : <NotesTable notes={notes} />}
        </div>
    );
}

export default Home;

import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNotes = () => {
    const { id } = useParams();
    const [note, setNote] = useState({});
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/notes/${id}`)
            .then((response) => {
                const { title, content, tags } = response.data;
                setTitle(title);
                setContent(content);
                setTags(tags.join(', '));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching note:', error);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:5000/notes/${id}`, {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim())
            });

            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating note:', error);
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-yellow-100'>
            <div className='max-w-lg w-full bg-white p-8 rounded-lg shadow-md'>
                <BackButton />
                <h1 className='text-3xl font-semibold mb-4 text-gray-800'>Edit Note</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor='title' className='block text-sm font-semibold text-gray-700'>Title</label>
                            <input
                                id='title'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='content' className='block text-sm font-semibold text-gray-700'>Content</label>
                            <textarea
                                id='content'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='tags' className='block text-sm font-semibold text-gray-700'>Tags (comma-separated)</label>
                            <input
                                id='tags'
                                type='text'
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300'
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : 'Update Note'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditNotes;

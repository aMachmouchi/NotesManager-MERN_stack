import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNotes = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/notes', {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim())
            });
            
            console.log(response.data);
            navigate('/'); // Redirect to home page after successful creation
        } catch (error) {
            console.error('Error creating note:', error);
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <div className="max-w-md mx-auto bg-yellow-100 border border-gray-300 rounded-lg p-6">
                <h1 className='text-3xl mb-4 font-semibold'>Create Note</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='title' className='block text-gray-700 font-bold'>
                            Title
                        </label>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full border-2 border-gray-300 p-2 rounded-md'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='content' className='block text-gray-700 font-bold'>
                            Content
                        </label>
                        <textarea
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='w-full border-2 border-gray-300 p-2 rounded-md'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='tags' className='block text-gray-700 font-bold'>
                            Tags (comma-separated)
                        </label>
                        <input
                            id='tags'
                            type='text'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className='w-full border-2 border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md'
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : 'Create Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNotes;

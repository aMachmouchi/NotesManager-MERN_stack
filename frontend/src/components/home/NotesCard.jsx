import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const NotesCard = ({ notes }) => {
    const handleDelete = (id) => {
        // Redirect to the DeleteNotes interface
        return <Link to={`/notes/delete/${id}`} />;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
                <div key={note._id} className="relative bg-yellow-200 shadow-md rounded-md p-4 transform rotate-1">
                    <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                    <p className="text-gray-700 mb-2">{note.content}</p>
                    <p className="text-gray-500 text-sm mb-4">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 flex items-center">
                        <Link to={`/notes/delete/${note._id}`}>
                            <button className="text-sm font-semibold transform rotate-45 focus:outline-none">
                                <MdOutlineDelete className="text-red-600" />
                            </button>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link to={`/notes/details/${note._id}`} className="flex items-center text-blue-500 hover:text-blue-700">
                            <BsInfoCircle className="mr-1" />
                            Details
                        </Link>
                        <div className="flex gap-4">
                            <Link to={`/notes/edit/${note._id}`} className="text-yellow-500 hover:text-yellow-700">
                                <AiOutlineEdit />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotesCard;

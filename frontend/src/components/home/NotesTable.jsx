import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const NotesTable = ({ notes }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-yellow-100 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-yellow-300">
                    <tr>
                        <th className="py-3 px-6 text-center border-b border-gray-200">No</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Title</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Content</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Created At</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Updated At</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Tags</th>
                        <th className="py-3 px-6 text-center border-b border-gray-200">Operations</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {notes.map((note, index) => (
                        <tr key={note._id} className="border-b border-gray-200 hover:bg-yellow-200">
                            <td className="py-3 px-6 text-center">{index + 1}</td>
                            <td className="py-3 px-6 text-center">{note.title}</td>
                            <td className="py-3 px-6 text-center">{note.content}</td>
                            <td className="py-3 px-6 text-center">{note.createdAt}</td>
                            <td className="py-3 px-6 text-center">{note.updatedAt}</td>
                            <td className="py-3 px-6 text-center">{note.tags.join(', ')}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex justify-center gap-4">
                                    <Link to={`/notes/details/${note._id}`}>
                                        <BsInfoCircle className="text-xl text-green-800" />
                                    </Link>
                                    <Link to={`/notes/edit/${note._id}`}>
                                        <AiOutlineEdit className="text-xl text-yellow-600" />
                                    </Link>
                                    <Link to={`/notes/delete/${note._id}`}>
                                        <MdOutlineDelete className="text-xl text-red-600" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotesTable;

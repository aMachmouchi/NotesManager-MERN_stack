import express from 'express';
import { Note } from '../models/noteModels.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.content) {
            return response.status(400).json({ message: "Title and content are required" });
        }
        const newNote = {
            title: request.body.title,
            content: request.body.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: request.body.tags || []
        };

        const note = await Note.create(newNote);
        return response.status(201).send(note);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

router.get('/', async (request, response) => {
    try {
        const notes = await Note.find({});

        return response.status(200).json({
            count: notes.length,
            data: notes
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/:id', async (request, response) => {
    try {

        const{ id } = request.params;

        const note = await Note.findById(id);

        return response.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.content) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        const{ id } = request.params;

        const result = await Note.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const{ id } = request.params;

        const result = await Note.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Note not found'});
        }
        return response.status(200).json({message: 'Note deleted'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;
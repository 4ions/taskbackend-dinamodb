// import { DynamoDB } from 'aws-sdk';
import {createTask, getAllTask, getTask, deleteTask, updateTask } from './task.controller';
import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

router.post('/', async (req:Request, res:Response) => {
    try {
        const { task, details } = req.body;

        if (!task) return res.status(400).json({message: "Task is required"});

        const data = await createTask(task, details);
        return res.status(200).json({
            data
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
})

router.get('/', async (req:Request, res:Response) => {
    try {
        const data = await getAllTask(req.body.lastEvaluatedKey);
        return res.status(200).json({
            data
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
});

router.get('/:id', async (req:Request, res:Response) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({message: "Id is required"});

        const data = await getTask(id);
        return res.status(200).json({
            data
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
});

router.put('/:id', async (req:Request, res:Response) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({message: "Id is required"});

        const { task, details } = req.body;
        const foundTask = await getTask(id);
        
        if (!foundTask) return res.status(404).json({message: "Task not found"});
        
        const data = await updateTask(id, task, details);
        return res.status(200).json({
            data
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
});

router.delete('/:id', async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        
        if (!id) return res.status(400).json({message: "Id is required"});

        const data = await deleteTask(id);
        return res.status(200).json({
            data
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
});

export default router;
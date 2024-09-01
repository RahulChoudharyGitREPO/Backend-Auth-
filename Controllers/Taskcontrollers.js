const Task = require('../Models/Task');

// Get all tasks for the authenticated user
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const newTask = new Task({
            title,
            description,
            dueDate,
            status: status || 'todo',
            user: req.user._id
        });
        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task created successfully', success: true, task: savedTask });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.taskId, user: req.user._id },
            { title, description, dueDate, status },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task updated successfully', success: true, task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.user._id });

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

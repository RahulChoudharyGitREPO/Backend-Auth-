const express = require('express');
const router = express.Router();
const TaskController = require('../Controllers/TaskController');
const ensureAuthenticated = require('../Middleware/Auth');

// CRUD operations for tasks
router.get('/', ensureAuthenticated, TaskController.getAllTasks);
router.post('/', ensureAuthenticated, TaskController.createTask);
router.get('/:taskId', ensureAuthenticated, TaskController.getTaskById);
router.put('/:taskId', ensureAuthenticated, TaskController.updateTask);
router.delete('/:taskId', ensureAuthenticated, TaskController.deleteTask);

module.exports = router;

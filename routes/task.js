const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middelwares/auth');
const { check } = require('express-validator');


router.post('/',
    auth,
    [
        check('name', 'El nombre de la tarea es requerida').notEmpty(),
        check('priority', 'La prioridad para la tarea es requerida').notEmpty(),
        check('dueDate', 'La fecha de vencimiento es requerida').notEmpty()
    ],
    taskController.createTask
);

router.get('/',
   auth,
   taskController.getTasks
);


router.put('/:id',
   auth,
   [
    check('name', 'El nombre de la tarea es requerida').notEmpty(),
    check('priority', 'La prioridad para la tarea es requerida').notEmpty(),
    check('dueDate', 'La fecha de vencimiento es requerida').notEmpty()
   ],
   taskController.updateTask
)

router.delete('/:id',
   auth,
   taskController.deleteTask
)


module.exports = router;
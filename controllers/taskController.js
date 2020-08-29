const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.createTask = async (req, rep) => {

      // satatus  1 = succes, 2 = no register, 3 = erros, 4 = server error
   let response = {};

   const errors = validationResult(req);
    //console.log(errors);
    if(!errors.isEmpty()){
        response.status =  3;
        response.errors = errors.array();
        return rep.status(400).json(response);
    }

   try{

      const task = new Task(req.body);
      task.userId = req.user.id;
      task.save();
      response.status = 1;
      response.message = "Tarea creada correctamente";
      response.task = task;
      rep.status(200).json(response);
     // rep.json(task);

   }catch(error){
        response.status = 2;
        response.message = "No se pudo registrar la tarea";
        return rep.status(200).json(response);
   }
}

exports.getTasks = async (req, rep) => {

    try{

      const tasks = await Task.find({ userId: req.user.id });
     // console.log(req.user);
      return rep.status(200).json(tasks);

    }catch(error){
        console.log(error);
        rep.status(500).send({msg: 'Ocurrió un error'});
    }
}

exports.updateTask = async (req, rep) => {

    let response = {};

    try {

    const errors = validationResult(req);
    //console.log(errors);
    if(!errors.isEmpty()){
        response.status =  3;
        response.errors = errors.array();
        return rep.status(400).json(response);
    }

    const { name, priority, dueDate} = req.body;
    const updateTask = {};
    if(name && priority && dueDate){
        updateTask.name = name;
        updateTask.priority = priority;
        updateTask.dueDate = dueDate;
        if(req.body.description){
            updateTask.description = req.body.description;
        }
    }

    const id = req.params.id;
    const userId = req.user.id;
    let task = await Task.findById(id);

    if(!task){
        response.status =  3;
        response.message = "Tarea no encontrada";
        return rep.status(400).json(response);
       //return rep.status(404).json({msg: 'Tarea no encontrada'});
    }

    let idCompare = (task.userId) ? task.userId.toString() : "0";

    if(idCompare !== userId){
        response.status =  3;
        response.message = "No autorizado";
       return rep.status(401).json(response);
    }

    task = await Task.findByIdAndUpdate({ _id: id }, { $set: updateTask}, { new: true });

    //rep.json({task});
    response.status = 1;
    response.message = "Tarea actulizado correctamenta";
    response.task = task;
    return rep.status(200).json(response);

    } catch (error) {
        console.log(error);
        response.status = 4;
        response.message = "Ha ocurrido un error en el servidor";
        rep.status(500).send(response);
    }

}

exports.deleteTask = async (req, rep) => {

    try {

        const id = req.params.id;
        const userId = req.user.id;
        let task = await Task.findById(id);

        if(!task){
           return rep.status(404).json({msg: 'Tarea no encontrada'});
        }

        let idCompare = (task.userId) ? task.userId.toString() : "0";

        if(idCompare !== userId){
           return rep.status(401).json({ msg: 'No autorizado'});
        }

        await Task.findOneAndRemove({ _id: req.params.id });

        rep.json({ status: 1, message: 'tarea eliminada'});

    } catch (error) {
        console.log(error);
        rep.status(500).send('Error en el servidor');
    }

}

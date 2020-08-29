const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
     },
    priority:{
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    dueDate:{
      type: Date,
      require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task', TaskSchema);
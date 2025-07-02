const mongoose = require("mongoose");
const schema = mongoose.Schema;

const enquriyschema = new schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true 
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("enquriy", enquriyschema);

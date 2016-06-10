const mongoose = require('mongoose');
const Schema = mongoose.Schema; //fields about models

// Define our model. unique: true sets the email created to be unique. mongoose does not account for case so lowercase true
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //fields about models
const bcrypt = require('bcrypt-nodejs');

// Define our model. unique: true sets the email created to be unique. mongoose does not account for case so lowercase true
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

// On Save Hook, encrypt password
// before saveing model, fun this function *pre
userSchema.pre('save', function(next) {
	// access to user model. user.email user.password
	const user = this;

	// generate a salt then run cb fn
	bcrypt.genSalt(10, function(err,salt) {
		if(err) { return next(err); }
		// hash (encrypt) pw using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) { return next(err); }

			// overwrite plain text pw with encypted pw
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) { return callback(err); }

		callback(null, isMatch);
	});
}
// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
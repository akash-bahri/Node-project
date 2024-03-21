const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    email: {
        type: String,
        unique: true,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
});

// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8);
//     }
//     next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;

const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)

// Function to hash a password
module.exports = async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
        const hash = await bcrypt.hash(password, salt); // Hash the password
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
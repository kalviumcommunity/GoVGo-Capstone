const User = require("../Models/users")

const user = async (req, res) => {
    try {   
      const {email} = req.body;
      const users = await User.find({email}, '-password -otp'); 
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ error: 'Error fetching users' });
    }
  };
  

const updteUser = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, mobileNumber, password } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (name) user.name = name;
      if (username) user.username = username;
      if (email) user.email = email;
      if (mobileNumber) user.mobileNumber = String(mobileNumber);
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
      res.json({ message: 'User updated successfully!', user });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Error updating user' });
    }
  };

  module.exports = {user,updteUser}

  
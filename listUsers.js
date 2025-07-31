const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/agriapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String
});

const User = mongoose.model('User', userSchema);

async function listUsers() {
  const users = await User.find({}, { email: 1, mobile: 1, _id: 0 });
  console.log("📄 Registered Users:\n", users);
  mongoose.disconnect();
}

listUsers().catch(console.error);
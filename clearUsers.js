const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/agriapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connected to MongoDB');
  await User.deleteMany({});
  console.log('🗑️ All users deleted');
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
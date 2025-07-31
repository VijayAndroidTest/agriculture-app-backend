const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/agriapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function cleanUsers() {
  try {
    const users = await User.find();
    const seenEmails = new Set();
    const seenMobiles = new Set();

    for (const user of users) {
      if (!user.email || !user.mobile) {
        console.log(`🗑️ Removing user with missing info: ${user._id}`);
        await User.findByIdAndDelete(user._id);
      } else if (seenEmails.has(user.email) || seenMobiles.has(user.mobile)) {
        console.log(`🗑️ Removing duplicate user: ${user._id}`);
        await User.findByIdAndDelete(user._id);
      } else {
        seenEmails.add(user.email);
        seenMobiles.add(user.mobile);
      }
    }

    console.log('✅ Cleanup complete.');
    process.exit();
  } catch (err) {
    console.error('❌ Error during cleanup:', err);
    process.exit(1);
  }
}

cleanUsers();
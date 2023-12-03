
// src/userdb.js
import fs from 'fs/promises';
import client from './dbclient.js';


const users = client.db('EIE4432GPChenChen').collection('users');

// Initialize the database with some users
async function init_db() {
  try {
    //
    const count = await users.countDocuments();
    if (count === 0) {
      const data = await fs.readFile('users.json');
      const usersData = JSON.parse(data);
      const result = await users.insertMany(usersData);
      console.log(`Added ${result.insertedCount} users`);
    }
  } catch (err) {
    console.error('Unable to initialize the database!');
    process.exit(1);
  }
}
// Initialize the database
init_db().catch(console.dir);

// Define an asynchronous function to validate a user
async function validate_user(username, password) {
  if (!username || !password) {
    return false;
  }
  // Fetch the user from the database
  try {
    const user = await users.findOne({ username, password });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}
// Define an asynchronous function to update a user
async function update_user(username, password, role, enabled) {
  try {
    // Construct a document
    const filter = { username: username };
    const updateDoc = {
      $set: { username: username, password: password, role: role, enabled: enabled }
    };
    const options = { upsert: true };
    const result = await users.updateOne(filter, updateDoc, options);
    // Check if the user was added
    if (result.upsertedCount === 0) {
      console.log('Added 0 user');
      return true;
    } else {
      console.log('Added 1 user');
      return true;
    }
  } catch (error) {
    console.error('Unable to update the database!', error);
    return false;
  }
}
// Define an asynchronous function to fetch a user
async function fetch_user(username) {
  try {
    // Fetch the user from the database
    const user = await users.findOne({ username });
    return user;
  } catch (error) {
    console.error('Unable to fetch from database!', error);
    return null;
  }
}

async function username_exist(username) {
  try {
    const user = await fetch_user(username);
    return user !== null;
  } catch (error) {
    console.error('Unable to fetch from database!', error);
    return false;
  }
}

username_exist('21106181').then((res) => console.log(res));

export { validate_user,update_user,fetch_user,username_exist };
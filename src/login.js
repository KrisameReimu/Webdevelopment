//src/login.js
import express from 'express';
import multer from 'multer';
import { promises as fs } from 'fs';
import bodyParser from 'body-parser'; 


const route = express.Router();
route.use(bodyParser.urlencoded({ extended: true })); 
route.use(bodyParser.json());
const users = new Map();

//const form = multer();

export default route;

async function init_userdb() {
  if (users.size > 0) {
    console.log('User database already populated. Exiting init_userdb.');
    return;
  }

  try {
    const data = await fs.readFile('users.json', 'utf8');
    const jsonData = JSON.parse(data);

    // Iterate over the user objects and add them to the 'users' Map
    jsonData.forEach((user) => {
      users.set(user.username, user);
    });

    console.log('Users loaded successfully from users.json');
  } catch (err) {
    console.error('Error loading users from users.json:', err);
  }
}


async function validate_user(username, password) {
  if (!users.has(username)) {
    return false; // Username does not exist in the user database
  }

  const user = users.get(username);
  if (user.password !== password) {
    return false; // Password mismatch
  }

  // Return an object containing associated user information
  return {
    username: user.username,
    password: user.password,
    role: user.role,
    enabled: user.enabled
  };
}

// Define an asynchronous request handler for POST /login
route.post('/login',  async (req, res) => {
  try {
    if (users.size === 0) {
      await init_userdb(); // Call init_userdb() if the users Map is empty
    }
    
    req.session.logged = false; // Reset login status to false
    console.log(req.body)
    const { username, password } = req.body;
    
    const user = await validate_user(username, password); // Check username and password using validate_user()

    if (!user || !user.enabled) {
      return res.status(401).json({
        status: 'failed',
        message: user && !user.enabled ? `User '${username}' is currently disabled` : 'Incorrect username and password'
      });
    }

    req.session.username = user.username;
    req.session.role = user.role;
    req.session.logged = true;
    req.session.timestamp = Date.now();

    return res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Incorrect username or password.'
    });
  }
});

// Define an asynchronous request handler for POST /logout
route.post('/logout', (req, res) => {
  if (req.session.logged) {
    req.session.destroy();
    res.end();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized'
    });
  }
});

// Define an asynchronous request handler for GET /me
route.get('/me', (req, res) => {
  if (req.session.logged) {
    const user = users.get(req.session.username);
    res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role
      }
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized'
    });
  }
});

// Define an asynchronous function named update_user()
async function update_user(username, password, role) {
  // Insert/Update the user object into users using the username as key
  users.set(username, { username, password, role, enabled: true });

  // Save changes into "users.json"
  try {
    // Create a local variable named userjson as an array
    const userjson = [];
    
    // Push each element in users to userjson
    users.forEach(user => userjson.push(user));
    
    // Serialize userjson as a JSON document and write the content to "users.json"
    await fs.writeFile('users.json', JSON.stringify(userjson), 'utf8');
    
    // If the write operation succeeds, return true. Otherwise, return false
    return true;
  } catch (err) {
    console.error('Error writing to users.json:', err);
    return false;
  }
}

// Define an asynchronous request handler for POST /register
route.post('/register',  async (req, res) => {
  if (users.size === 0) {
    await init_userdb(); // Call init_userdb() if the users Map is empty
  }
  
  const { username, password, role } = req.body;
  console.log(req.body);
  console.log({ username, password, role });

  
  // Check if both "username" and "password" are not empty
  if (!username || !password) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing fields'
    });
  }

  // Check registration data against criteria
  if (username.length < 3) {
    return res.status(400).json({
      status: 'failed',
      message: 'Username must be at least 3 characters'
    });
  }
  // Check if the username already exists in the user database
  if (users.has(username)) {
    return res.status(400).json({
      status: 'failed',
      message: `Username ${username} already exists`
    });
  }
  // Check if the password is at least 8 characters
  if (password.length < 8) {
    return res.status(400).json({
      status: 'failed',
      message: 'Password must be at least 8 characters'
    });
  }
  
  // Check if the role is either "student" or "user"
  if (role !== 'student' && role !== 'user') {
    return res.status(400).json({
      status: 'failed',
      message: 'Role can only be either `student` or `user`'
    });
  }
  
  // If all criteria are met, insert a new user to the user database using update_user()
  const updateResult = await update_user(username, password, role);
  console.log(users);
  console.log(updateResult);
  // Return a JSON response based on the result of update_user()
  if (updateResult) {
    return res.json({
      status: 'success',
      user: {
        username,
        role
      }
    });
  } else {
    return res.status(500).json({
      status: 'failed',
      message: 'Account created but unable to save into the database'
    });
  }
  
});


export { express, multer, users, init_userdb, validate_user, update_user, route };
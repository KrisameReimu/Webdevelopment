
import { validate_user } from './userdb.js';

async function runCommand() {
  try {
    const result = await validate_user('alice', 'ecila');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

runCommand();

// Import commander using ES module syntax
import { program } from 'commander';

// Import functions from contacts.js using ES module syntax
import { listContacts, getContactById, addContact, updateContact, removeContact } from './contacts.js';

// Configure commander options
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const options = program.opts();
console.log(options);

// Define the action handling function
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.log('🐍 Add new contact', newContact);
      break;

    case 'update':
      const updContact = await updateContact(id, { name, email, phone });
      console.log('🐝 updateContacts: ', updContact);
      break;

    case 'remove':
      const resp = await removeContact(id);
      console.log(resp);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// Invoke the action based on command-line options
invokeAction(options);


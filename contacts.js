import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.join(process.cwd(), './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((item) => item.id === contactId) || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;

  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const newContacts = contacts.filter((item) => item.id !== id);
  if (contacts.length === newContacts.length) return null;

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contacts.filter((item) => item.id === id);
};

export {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};

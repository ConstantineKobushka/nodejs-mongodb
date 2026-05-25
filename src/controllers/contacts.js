import createError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact!',
    data,
  });
};

export const apsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await contactServices.apdateContact(id, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully apsert contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.apdateContact(id, req.body);

  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully apdate contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deletContact({ _id: id });

  if (!data) {
    throw createError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};

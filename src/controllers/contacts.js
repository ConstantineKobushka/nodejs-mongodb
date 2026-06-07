import createError from 'http-errors';

import * as contactService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { sortByList } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await contactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const data = await contactService.getContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await contactService.addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactService.updateContact(
    { _id, userId },
    { ...req.body, userId },
    {
      upsert: true,
    }
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactService.updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactService.deletContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};

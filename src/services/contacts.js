import ContactCollection from '../db/models/contacts.js';
import { calcPaginationdata } from '../utils/calcPaginationdata.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  console.log(filter);

  const contactsQuery = ContactCollection.find(); // отримуємо об'єкт запиту

  if (filter.contactType !== undefined) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const total = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments(); // countDocuments повертає загальну кількість обєктів

  const data = await contactsQuery
    .skip(skip)
    .limit(limit) // пропусти перші skip об'єкта і поверни наступні limit
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationdata({ total, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (_id, contactData, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(
    { _id },
    contactData,
    {
      upsert,
      includeResultMetadata: true,
    }
  );

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deletContact = filter =>
  ContactCollection.findOneAndDelete(filter);

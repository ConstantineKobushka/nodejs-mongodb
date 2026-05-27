import ContactCollection from '../db/models/contacts.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (_id, contactData, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(
    { _id },
    contactData,
    {
      new: true,
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

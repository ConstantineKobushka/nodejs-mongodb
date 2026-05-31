const parseContactType = value => {
  if (typeof value !== 'string') return;

  const validTypes = ['home', 'personal'];

  if (validTypes.includes(value.toLowerCase())) {
    return value.toLowerCase();
  }

  return;
};

const parseContactIsFavorite = value => {
  if (typeof value !== 'string') return;

  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  return;
};

export const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseContactIsFavorite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};

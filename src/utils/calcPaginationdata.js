export const calcPaginationdata = ({ total, page, perPage }) => {
  const totalPage = Math.ceil(total / perPage);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  return { totalPage, hasNextPage, hasPrevPage };
};

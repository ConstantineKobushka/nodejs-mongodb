export const saveErrorHandler = (error, doc, next) => {
  error.status = 400;

  if (next) {
    next(error);
  }
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;

  if (next) {
    next();
  }
};

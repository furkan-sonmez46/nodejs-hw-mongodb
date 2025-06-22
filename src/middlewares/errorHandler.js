// export const errorHandler = (err, req, res, next) => {
//   if (err.name === 'CastError') {
//     return res.status(404).json({
//       status: 404,
//       message: 'Contact not found',
//     });
//   }
//   res.status(500).json({
//     message: 'Something went wrong',
//     error: err.message,
//   });
// };

import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

import Joi from 'joi';

export const bookingSchema = Joi.object({
  eventId: Joi.number().integer().positive().required().messages({
    'number.base': 'Event ID must be a number',
    'number.integer': 'Event ID must be an integer',
    'number.positive': 'Event ID must be a positive integer',
    'any.required': 'Event ID is required',
  }),
  seatsToBook: Joi.number().integer().positive().required().messages({
    'number.base': 'Seats to book must be a number',
    'number.integer': 'Seats to book must be an integer',
    'number.positive': 'Seats to book must be a positive integer',
    'any.required': 'Seats to book is required',
  }),
});

import Joi from 'joi';

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  date: Joi.date().iso().greater('now').required(),
  seats: Joi.number().integer().min(1).required(),
});

export const updateEventSchema = Joi.object({
  eventId: Joi.number().required(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(5).max(500).optional(),
  date: Joi.date().optional(),
  seats: Joi.number().integer().min(1).optional(),
});
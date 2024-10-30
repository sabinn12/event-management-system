import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { eventSchema } from '../../../validation/eventSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply the middleware for authentication
  await new Promise((resolve) => authMiddleware(req, res, resolve));

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate request data using Joi
  const { error, value } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, description, date, seats } = value;

  try {
    // Create a new event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        seats,
      },
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
}

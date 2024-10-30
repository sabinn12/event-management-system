import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const prisma = new PrismaClient();

// Validation schema for event ID
const idSchema = Joi.object({
  eventId: Joi.number().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check for `eventId` query parameter
  const { eventId } = req.query;

  const { error } = idSchema.validate({ eventId: eventId ? Number(eventId) : undefined });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    if (eventId) {
      // Fetch a specific event by ID
      const event = await prisma.event.findUnique({
        where: { id: Number(eventId) },
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      return res.status(200).json({ event });
    } else {
      // Fetch all events
      const events = await prisma.event.findMany();
      return res.status(200).json({ events });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving events', error });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../../../middleware/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure that only authorized users can access
  authMiddleware(req, res, async () => {
    if (req.method !== 'PUT') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { eventId, title, description, date, seats } = req.body;

    try {
      // Update the event using the provided eventId
      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          title,
          description,
          date: new Date(date),
          seats,
        },
      });

      res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error });
    }
  });
}

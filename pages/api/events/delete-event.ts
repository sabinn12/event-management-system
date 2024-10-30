import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../../../middleware/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply authentication and authorization
  await authMiddleware(req, res, async () => {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    try {
      // Delete the event by ID
      const deletedEvent = await prisma.event.delete({
        where: { id: parseInt(eventId) },
      });

      res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error });
    }
  });
}

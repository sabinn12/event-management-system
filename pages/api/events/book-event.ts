// pages/api/events/book-event.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { bookingSchema } from '../../../validation/bookingSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Validate request body
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { eventId, seatsToBook } = req.body;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.seats < seatsToBook) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update the seats count
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { seats: event.seats - seatsToBook },
    });

    res.status(200).json({ message: 'Booking successful', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error processing booking', error });
  }
}

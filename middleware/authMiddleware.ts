// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload;
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
}

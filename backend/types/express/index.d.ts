import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      file?: {
        filename: string;
        // add more multer file props if needed
      };
      user?: {
        id: string;
        // add more user props if needed
      };
    }
  }
}

import { Response } from 'express';

export default {
  baseErrors(res: Response, error: Error) {
    if (error instanceof Error) {
      res.status(400).json(error);
    } else {
      res.status(500).json({ error: 'Internal Server Error', result: error });
    }
  },
};

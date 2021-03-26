import axios from 'axios';
import { Request, Response } from 'express';
import BaseErrors from '.';
import * as variables from '../utils/variables.json';

require('dotenv').config();

const token = process.env.TOKEN;
const key = process.env.KEY;
const { apiUrl, idBoard } = variables.resources.trello;

export default {
  async getBoardInformation(req: Request, res: Response) {
    try {
      const fields = ['name', 'shortUrl'];

      const response = await axios.get(
        `${apiUrl}/boards/${idBoard}/?fields=${fields}&key=${key}&token=${token}`
      );

      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },
  async getAllLists(req: Request, res: Response) {
    try {
      const response = await axios.get(
        `${apiUrl}/boards/${idBoard}/lists?key=${key}&token=${token}`
      );
      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },
};

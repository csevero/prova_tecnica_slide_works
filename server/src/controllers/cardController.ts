import axios from 'axios';
import { Request, Response } from 'express';
import BaseErrors from '.';
import * as variables from '../utils/variables.json';

require('dotenv').config();

const token = process.env.TOKEN;
const key = process.env.KEY;
const { apiUrl } = variables.resources.trello;

export default {
  async create(req: Request, res: Response) {
    try {
      const { idList } = req.query;
      const values = req.body;

      const response = await axios.post(
        `${apiUrl}/cards?idList=${idList}&key=${key}&token=${token}`,
        values
      );

      return res.status(201).json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await axios.get(
        `${apiUrl}/cards/${id}?key=${key}&token=${token}`
      );

      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const values = req.body;

      const response = await axios.put(
        `${apiUrl}/cards/${id}?key=${key}&token=${token}`,
        values
      );

      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await axios.delete(
        `${apiUrl}/cards/${id}?key=${key}&token=${token}`
      );

      return res.send();
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },
};

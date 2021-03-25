import axios from 'axios';
import { Request, Response } from 'express';
import BaseErrors from '.';
import variables from '../utils/variables.json';

require('dotenv').config();

const token = process.env.TOKEN;
const key = process.env.KEY;
const { apiUrl, idBoard } = variables.resources.trello;

export default {
  async create(req: Request, res: Response) {
    try {
      const values = req.body;
      const response = await axios.post(
        `${apiUrl}/lists?key=${key}&token=${token}&idBoard=${idBoard}`,
        values
      );

      console.log(response);

      return res.status(201).json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await axios.get(
        `${apiUrl}/lists/${id}/?key=${key}&token=${token}&idBoard=${idBoard}`
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
        `${apiUrl}/lists/${id}/?key=${key}&token=${token}&idBoard=${idBoard}`,
        values
      );

      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },

  async getAllCards(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await axios.get(
        `${apiUrl}/lists/${id}/cards/?key=${key}&token=${token}&idBoard=${idBoard}`
      );

      return res.json(response.data);
    } catch (err) {
      BaseErrors.baseErrors(res, err);
    }
  },
};

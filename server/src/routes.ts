import { Router } from 'express';
import boardController from './controllers/boardController';
import cardController from './controllers/cardController';
import listController from './controllers/listController';

const route = Router();

route.get('/board-lists', boardController.getAllLists);
route.get('/board-info', boardController.getBoardInformation);

route.get('/list-by-id/:id', listController.listById);
route.get('/list-all-cards/:id', listController.getAllCards);
route.post('/list-create', listController.create);
route.put('/list-update/:id', listController.update);

route.get('/card-list/:id', cardController.listById);
route.post('/card-create', cardController.create);
route.put('/card-update/:id', cardController.update);
route.delete('/card-delete/:id', cardController.delete);

export default route;

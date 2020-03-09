import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ m̀sg: 'ok' }));

export default routes;

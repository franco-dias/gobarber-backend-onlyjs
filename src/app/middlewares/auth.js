import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig;
    // evita o uso de callback. a definição padrão do jwt verify é (token, secret, callback)
    // decoded contém o payload enviado na hora de criar o token
    const decoded = await promisify(jwt.verify)(token, secret);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

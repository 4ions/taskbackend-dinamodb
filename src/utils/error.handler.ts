import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
  console.error(err); // Registrar el error en los registros o enviar notificaciones, si es necesario
  res.status(500).json({ message: "Internal server error" });
  next(err)
}

export default errorHandler;
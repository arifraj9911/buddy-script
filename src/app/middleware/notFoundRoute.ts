import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = httpStatus.NOT_FOUND;

  res.status(statusCode).json({
    success: false,
    message: "API not found!",
    error: "",
  });

  return;
};

export default notFoundRoute;

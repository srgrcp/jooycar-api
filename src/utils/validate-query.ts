import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function ValidateQuery<T extends object>(
  classValidator: ClassConstructor<T>,
) {
  return function (
    _: unknown,
    __: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: [Request, Response, NextFunction]) {
      const [req, res] = args;
      const instance = plainToInstance(classValidator, req.query);

      const errors = validateSync(instance);

      if (errors.length > 0) {
        return res.status(400).json(
          errors.map(error => ({
            message: error.toString(false, true),
          })),
        );
      }

      req.query = instance as any;

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

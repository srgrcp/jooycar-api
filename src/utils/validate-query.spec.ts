import { Request, Response } from 'express';
import { TripsQueryDTO } from '../dto/trips-query.dto';
import { ValidateQuery } from './validate-query';
import { plainToInstance } from 'class-transformer';

class TestController {
  @ValidateQuery(TripsQueryDTO)
  static async testResolver(req: Request, res: Response) {
    res.json(req.query);
  }
}

describe('ValidateQuery', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  });

  it('should return the request query as JSON', async () => {
    const req = {
      query: {
        startGte: '0',
        startLte: '0',
        distanceGte: '0',
        limit: '0',
        offset: '0',
      },
    } as unknown as Request;
    const instance = plainToInstance(TripsQueryDTO, req.query);

    await TestController.testResolver(req, res);

    expect(res.json).toHaveBeenCalledWith(instance);
  });

  it('should return 400 if query is invalid', async () => {
    const req = {
      query: {
        startGte: 'a',
      },
    } as unknown as Request;

    await TestController.testResolver(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      {
        message:
          ' - property startGte has failed the following constraints: isNumber \n',
      },
    ]);
  });
});

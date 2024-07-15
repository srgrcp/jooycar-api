import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ValidateBody } from './validate-body';
import { ReadingListDTO } from '../dto/reading-list.dto';

class TestController {
  @ValidateBody(ReadingListDTO)
  static async testResolver(req: Request, res: Response) {
    res.json(req.body);
  }
}

describe('ValidateBody', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  });

  it('should return the request body as JSON', async () => {
    const req = {
      body: {
        readings: [
          {
            time: 1642500462000,
            speed: 9,
            speedLimit: 38,
            location: {
              lat: -33.580158,
              lon: -70.567227,
            },
          },
          {
            time: 1642500466000,
            speed: 26,
            speedLimit: 38,
            location: {
              lat: -33.58013,
              lon: -70.566995,
            },
          },
          {
            time: 1642500470000,
            speed: 28,
            speedLimit: 38,
            location: {
              lat: -33.580117,
              lon: -70.566633,
            },
          },
          {
            time: 1642500474000,
            speed: 30,
            speedLimit: 38,
            location: {
              lat: -33.580095,
              lon: -70.566372,
            },
          },
          {
            time: 1642500478000,
            speed: 32,
            speedLimit: 38,
            location: {
              lat: -33.58007,
              lon: -70.56612,
            },
          },
        ],
      },
    } as unknown as Request;
    const instance = plainToInstance(ReadingListDTO, req.body);

    await TestController.testResolver(req, res);

    expect(res.json).toHaveBeenCalledWith(instance);
  });

  it('should return 400 if body is invalid', async () => {
    const req = {
      body: {
        readings: [
          {
            time: 1642500462000,
            speed: 9,
            speedLimit: 38,
            location: {
              lat: -33.580158,
              lon: -70.567227,
            },
          },
        ],
      },
    } as unknown as Request;

    await TestController.testResolver(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      {
        message:
          ' - property readings has failed the following constraints: arrayMinSize \n',
      },
    ]);
  });
});

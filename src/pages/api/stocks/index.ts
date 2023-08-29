import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { stockValidationSchema } from 'validationSchema/stocks';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStocks();
    case 'POST':
      return createStock();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStocks() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.stock
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'stock'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createStock() {
    await stockValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.stock_advice?.length > 0) {
      const create_stock_advice = body.stock_advice;
      body.stock_advice = {
        create: create_stock_advice,
      };
    } else {
      delete body.stock_advice;
    }
    if (body?.transaction?.length > 0) {
      const create_transaction = body.transaction;
      body.transaction = {
        create: create_transaction,
      };
    } else {
      delete body.transaction;
    }
    const data = await prisma.stock.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

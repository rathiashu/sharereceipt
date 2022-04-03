// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { create } from '../../utils/dataHandler';
import prisma from '../../lib/prisma';
import { PrismaClient, Prisma } from '@prisma/client';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const { quality, rate, weaver, payment, quantity, partyName, weaverPrice } = req.body;


  try {
    const result =  await prisma.order.create({
      data: {
        'quality': quality,
        'quantity': quantity,
        'rate': rate,
        'weaverName': weaver,
        'weaverPrice': weaverPrice,
        'partyName': partyName,
        'payment': payment,
      },
    });
    res.status(200).send(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e;
    }

  
  // res.json(result);


  // the rest of your code
}

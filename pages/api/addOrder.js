// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { create } from '../../utils/dataHandler';
import prisma from '../../lib/prisma';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const { quality, rate, weaver, payment, quantity, partyName, weaverPrice } = req.body;

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
  // res.json(result);
  res.status(200).send(result);


  // the rest of your code
}

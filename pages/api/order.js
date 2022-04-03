
import prisma from '../../lib/prisma';


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const result = await prisma.order.findMany();

  res.json(result);

  // the rest of your code
}

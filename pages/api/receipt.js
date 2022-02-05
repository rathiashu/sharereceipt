// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { create } from '../../utils/dataHandler';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // const body = JSON.parse(req.body);

  const id = create(req.body);
  res.status(200).json({ id});

  // the rest of your code
}

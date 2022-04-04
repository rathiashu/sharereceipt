/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../../styles/detail.module.scss'
import {RTable} from '../../components/RTable';

export default function detail() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('/api/order', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => {
      setOrders(data);
    })
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ram leela generate receipt</title>
        <meta name="description" content="ram leela reference" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RTable data={orders}></RTable>
      </main>
    </div>
  )
}


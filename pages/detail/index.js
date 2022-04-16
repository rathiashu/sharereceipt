/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../../styles/detail.module.scss'
import {RTable} from '../../components/RTable';
import { useExcelDownloder } from 'react-xls';

export default function detail() {
  const [orders, setOrders] = useState([]);
  const [excelData, setExcelData] = useState({data1: []});

  const { ExcelDownloder, Type, setData } = useExcelDownloder();

  const excelColumnsConfig = [{
      name: 'Order Id',
      key: 'order_id',
    },
    {
      name: 'Weaver Name',
      key: 'weaverName',
    },
    {
      name: 'Party Name',
      key: 'partyName',
    },
    {
      name: 'Order Date',
      key: 'orderDate',
    },
    {
      name: 'Quality',
      key: 'quality',
    },
    {
      name: 'Quantity',
      key: 'quantity',
    },
    {
      name: 'Rate',
      key: 'rate',
    },
    
    {
      name: 'Weaver Price',
      key: 'weaverPrice',
    },
    {
      name: 'Payment',
      key: 'payment'
    },
  ];


  const formateDate = (d) => {
    return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear();
  }
  useEffect(() => {
    fetch('/api/order', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => {
      let excelmodifiedData = [];
      const modifiedData = data.map(d => {
        d.orderDate = formateDate(new Date(d.createdAt));
        let config = {}
        excelColumnsConfig.forEach(column => {
          config[column.name] = d[column.key];
        })
        excelmodifiedData.push(config);
        return d;
      })
      setExcelData({data1: excelmodifiedData});
      setData({data1: excelmodifiedData});
      setOrders(modifiedData);
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
        <ExcelDownloder
          data={excelData}
          filename={`Ramleela-orders`}
          type={Type.Button}
          className={styles['download-report']}
        >
          Download
        </ExcelDownloder>
        <RTable data={orders}></RTable>
      </main>
    </div>
  )
}


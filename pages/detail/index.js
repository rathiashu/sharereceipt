
import Head from 'next/head'
import styles from '../../styles/detail.module.scss'
import {RTable} from '../../components/RTable';
import prisma from '../../lib/prisma';


export async function getStaticProps() {
    const result = await prisma.order.findMany();
    return {props: { orders: JSON.parse(JSON.stringify(result))}};
}

export default function detail({orders}) {
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


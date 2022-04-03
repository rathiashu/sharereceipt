
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


function PageWithJSbasedForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    let postData = {
      'quality': "",
      // 'weight': "",
      'rate': "",
      'weaver': "",
      'weaverPrice': "",
      'payment': "",
      'quantity': "",
      "partyName": "",
    }

    // // Get data from the form.
    // const data = {
    //   first: event.target.first.value,
    //   last: event.target.last.value,
    // };
    // const formData = event.target;
    // Object.keys(postData).map(key => {
    //   postData[key] = formData[key].value;
    // })

    fetch('/api/order', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData),
    })
    .then((res) => res.json())
    .then((data) => {
      // setData(data)
      // setLoading(false)
      console.log(data);
    //   const msgContent = {
    //     message: messageTemplate(postData, data.order_id) // required
    //   };
    //   const form = document.getElementById("orderForm");
    //   form.reset();
    //   shareTextViaNativeSharing(msgContent, () => {
    //     // fallback function if native sharing is not supported
    //     // for example, send the message via the Click to Chat feature instead
    //     shareTextToWhatsApp(msgContent.message);
    //   });
    })

  }
  
  
  return (
    <div  className="w-form">
      <form id ="orderForm" onSubmit={handleSubmit}>
        <div className="w-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    // We pass the event to the handleSubmit() function on submit.
  )
}


import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { shareTextToWhatsApp, shareTextViaNativeSharing, numberFormat } from '../utils/index';


// export function getServerSideProps() {
//   // let receipts = getAll();
//   // const id = receipts.length ? Math.max(...receipts.map(x => x.id)) + 1 : 1;
//   // return { props: { receiptId:  id} }
//   return { props: { receiptId:  1} }
// }

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Raam leela generate receipt</title>
        <meta name="description" content="ram leela tex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          <PageWithJSbasedForm rid={props.receiptId}/> 
        </h1>
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
    const formData = event.target;
    Object.keys(postData).map(key => {
      postData[key] = formData[key].value.trim();
    })

    fetch('/api/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
    .then((res) => res.json())
    .then((data) => {
      // setData(data)
      // setLoading(false)
      const msgContent = {
        message: messageTemplate(postData, data.order_id) // required
      };
      const form = document.getElementById("orderForm");
      form.reset();
      shareTextViaNativeSharing(msgContent, () => {
        // fallback function if native sharing is not supported
        // for example, send the message via the Click to Chat feature instead
        shareTextToWhatsApp(msgContent.message);
      });
    })

  }

  const messageTemplate = ( data, rid) => {
    let date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    const temp = 
    
    `*Ramlila Textiles*       Date: ${formattedDate}
    
    *To:* ${data.partyName}
  
    ***_Order Confirmation_***
    *Order Number:* ${rid}
    *Quality:* ${data.quality}
    *Quantity:* ${data.quantity}
    *Rate:* ${data.rate}
    *Weaver:* ${data.weaver}
    *Payment:* ${data.payment}
  
    *We are not responsible for any loss or damage in transit*
    *We will not accept any claim after processing of goods*`;
    return temp;
  }
  
  
  return (
    <div  className="w-form">
      <form id ="orderForm" onSubmit={handleSubmit}>
        {/* <div className="form-item">
          <label htmlFor="orderNumber">Order Number</label>
          <input type="text" id="orderNumber" name="orderNumber" value={rid || ''} required />
        </div> */}
        <div className="form-item">
          <label htmlFor="quality">Quality</label>
          <input type="text" id="quality" name="quality" required />
        </div>
        {/* <div className="form-item">
          <label htmlFor="weight">Weight</label>
          <input type="text" id="w"eight name="weight" required />
        </div> */}
        <div className="form-item">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" id="quantity" name="quantity" required />
        </div>
        <div className="form-item">
          <label htmlFor="rate">Rate</label>
          <input type="text" id="rate" name="rate" required />
        </div>
        <div className="form-item">
          <label htmlFor="weaver">Weaver Name</label>
          <input type="text" id="weaver" name="weaver" required />
        </div>
        <div className="form-item">
          <label htmlFor="weaver">Weaver Price</label>
          <input type="text" id="weaver-price" name="weaverPrice" required />
        </div>
        <div className="form-item">
          <label htmlFor="partyName">Party Name</label>
          <input type="text" id="partyName" name="partyName" required />
        </div>
        <div className="form-item">
          <label htmlFor="payment">Payment</label>
          <input type="text" id="payment" name="payment" required />
        </div>
        <div className="w-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    // We pass the event to the handleSubmit() function on submit.
  )
}

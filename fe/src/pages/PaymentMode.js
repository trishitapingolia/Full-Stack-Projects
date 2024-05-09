import React from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from'react-router-dom';

const PaymentMode = () => {
  const OrderId = useParams();
  console.log(OrderId);

  const navigate = useNavigate();

  const formhandle = (e) => {
    e.preventDefault();
    const Order_Id = OrderId.orderId;
    navigate(`/preview/${Order_Id}`);
  }
  
  return (
    <div className='container d-flex justify-content-center login'>
      <Form style={{ width: "500px" }}>
        <h1 className='mb-4'>Payment Method</h1>
        <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            name="payment"
            value="paypal"
            label="Paypal"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            name="payment"
            value="stripe"
            label="Stripe"
          />
        </Form.Group>
        <Link onClick={(e)=>formhandle(e)} type='submit' className='btn btn-warning'>Next</Link>
      </Form>
    </div>
  )
}

export default PaymentMode
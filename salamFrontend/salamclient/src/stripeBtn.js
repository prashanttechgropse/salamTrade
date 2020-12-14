import React from "react";
import StripeCheckout from "react-stripe-checkout";

const stripeBtn = ({ payableAmount, shippingCharges, cartAmount, userId,saveOrderData }) => {
  const publishableKey = "pk_test_ndY3VSaj13uVmOszfc4dUyB500lSM6buEd";

  const onToken = token => {
    const body = {
      amount: payableAmount,
      token: token,
      senderId : userId,
      shippingCharges
    };
    saveOrderData(body)
  }; 
  return (
    <StripeCheckout
      label="Online Payment" //Component button text
      name="SalamTrade" //Modal Header
      description="Secure Payment"
      panelLabel="Pay Now" //Submit button in modal
      amount={payableAmount * 100} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="./images/logo/logo.png" //Pop-in header image
      billingAddress={false}
    />
  );
};

export default stripeBtn;

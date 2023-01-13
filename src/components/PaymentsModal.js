import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./PaymentsModal.css";

const customStyles = {
 content: {
   top: "20%",
   left: "40%",
   right: "40%",
   bottom: "auto",
 },
};

const PaymentsModal = ({ modalState, setModalState }) => {
    // Our state for the info we will send to either generate a new invoice or pay an invoice
    const [formData, setFormData] = useState({
        amount: 0,
        invoiceToPay: "",
    });
    // Our state for storing the invoice we created to be paid
    const [invoice, setInvoice] = useState("");
    // Our state for the invoice we paid
    const [paymentInfo, setPaymentInfo] = useState({
        paymentHash: "",
        checkingId: "",
    });
    
    const handleSend = () => {};
    
    const handleReceive = () => {};
    

 return (
    <Modal
    isOpen={modalState.open}
    style={customStyles}
    contentLabel="Example Modal"
    appElement={document.getElementById("root")}
  >
    <p
      className="close-button"
      onClick={() => {
        setModalState({ open: false, type: null });
      }}
    >
      X
    </p>
    {/* If it is a send */}
    {modalState.type === "send" && (
      <form>
        <label>paste an invoice</label>
        <input
          type="text"
          value={formData.invoiceToPay}
          //event
          onChange={(e) =>
            //spread operator ...
            //event.target.value
            //update form as enters character (dont get rid of data, just update amount)
            setFormData({ ...formData, invoiceToPay: e.target.value })
          }
        />
        <button className="button" onClick={(e) => handleSend(e)}>
          Submit
        </button>
      </form>
    )}
    {/* If it is a receive */}
    {modalState.type === "receive" && (
      <form>
        <label>enter amount</label>
        <input
          type="number"
          min="0"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value }) 
          }
        />
        <button className="button" onClick={(e) => handleReceive(e)}>
          Submit
        </button>
      </form>
    )}
    {/* If we are displaying our newly created invoice */}
    {invoice && (
      <section>
        <h3>Invoice created</h3>
        <p>{invoice}</p>
        {/* ToDo: Create a QR code out of this invoice as well */}
      </section>
    )}
    {/* If we are displaying the status of our successful payment */}
    {paymentInfo.paymentHash && (
      <section>
        <h3>Payment sent</h3>
        <p>Payment hash: {paymentInfo.paymentHash}</p>
        <p>Checking id: {paymentInfo.checkingId}</p>
      </section>
    )}
  </Modal>


 );
};

export default PaymentsModal;

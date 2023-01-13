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
     <p>Here's our modal!</p>
   </Modal>
 );
};

export default PaymentsModal;

import { useState } from "react";
import "./DonationForm.css";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";


const DonationForm = () => {
    const[amount, setAmount] = useState(1);
    const[totalAmount, setTotalAmout] = useState(100);

    const[preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('YOUR_PUBLIC_KEY');

    const handleButtonClick = (amount) =>{

        setAmount(amount);
        setTotalAmout(amount * 100);
    };
    const handleInputChange = (e) =>{
        setAmount(e.target.value);
        setTotalAmout(e.target.value * 100);
    };
     /*mercado pago functions*/ 
    const createPreference = async () =>{
        try{
            const response =await axios.post ("http://localhost:8000/create_preference",{
                description: "gracias por los corazones",
                price: totalAmount,
                quantity:1,
            });
            const{id} = response.data;
            return id;
        } catch (error){
            console.log(error);   
             }
    };
    const handleBuy = async()=>{
        const id = await createPreference();
        if(id){
            setPreferenceId(id)
        }
    };

  return (
   <>
    <button type="button" className="donate-button" onClick={()=> handleButtonClick(3)}>3❤</button>
    <button type="button" className="donate-button" onClick={()=> handleButtonClick(5)}>5❤</button>
    <button type="button" className="donate-button" onClick={()=> handleButtonClick(10)}>10❤</button>

    <div className="input-container">
        <input type="number" className="donate-input" min="1" value={amount}  onChange={handleInputChange}/>
    <p className="donate-amount"> Invitame {amount} {amount == 1 ?"Corazonsito $ ":"Corazonsitos $"} {totalAmount}</p>
    </div>
 
    <div>
        <button className="donate-link" onClick={handleBuy}> Doname </button>
        {preferenceId &&           
<Wallet initialization={{ preferenceId }} />}
        </div> 
     </>
  );
};

export default DonationForm

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FinishSignupContainer,
  FinishSignupHeader,
  SignupInput,
  FinishSignupButton,
} from './styles';
import HostServer  from '../host/host';

function FinishSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFinishSignup = async () => {
    // Add logic to finish signup
    const mobileNumber = localStorage.getItem('phoneNumber')
    const associatedMerchantID = localStorage.getItem('associatedMerchantID')
    const merchantAssociatedApparelID = localStorage.getItem('merchantAssociatedApparelID')

    try{
      const response = await fetch(`${HostServer}/customer/add-details?merchantID=${associatedMerchantID}&apparelID=${merchantAssociatedApparelID}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phoneNumber": mobileNumber,
          "email": email,
          "fullName": name,
        }),
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("customerToken", data.token)
        navigate(data.redirectURL)
      }
    } catch(err) {
      console.log(err.message)
    }
  };

  return (
    <FinishSignupContainer>
      <FinishSignupHeader>Finish Signup</FinishSignupHeader>
      <SignupInput
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SignupInput
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FinishSignupButton onClick={handleFinishSignup}>Finish Signup</FinishSignupButton>
    </FinishSignupContainer>
  );
}

export default FinishSignup;

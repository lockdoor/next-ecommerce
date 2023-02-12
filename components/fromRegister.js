import React, {useState} from 'react'
// import { signIn } from "next-auth/react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function FromRegister() {
  const router = useRouter()
  const [name, setName] = useState("lockdoor")
  const [email, setEmail] = useState("lockdoor@gmail.com")
  const [password, setPassword] = useState("12345678")
  const [errorMessage, setErrorMessage] = useState("")
  const submitHandler = async(e) => {

    e.preventDefault()
    await axios.post(
      `/api/register`,
      {name, email, password})
      .then(() => router.replace("/login"))
      .catch(err => setErrorMessage(err.response.data.error))
  }
  return (
    <div>
      <form onSubmit={submitHandler}
        className="flex flex-col max-w-sm mx-auto my-5"
      >
        {errorMessage && <div className='form-error-message'>{errorMessage}</div>}
        <input 
          className='input-text'
          type={'text'}
          placeholder='Name'
          value={name}
          onChange={e=>setName(e.target.value)}
        />
        <input 
          className='input-text'
          type={'text'}
          placeholder='Email Address'
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input 
          className='input-text'
          type={'password'}
          placeholder='Password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button type="submit" className='btn-submit' >LOGIN</button>
      </form>
    </div>
  )
}

import React, {useState} from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

export default function FromLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("lockdoor@gmail.com")
  const [password, setPassword] = useState("12345678")
  const [errorMessage, setErrorMessage] = useState("")
  const submitHandler = async(e) => {
    e.preventDefault()
    const response = await signIn('credentials', 
    { 
      email, 
      password, 
      redirect: false
    })
    if (response.error) {
      setErrorMessage(response.error)
    }
    else{
      setErrorMessage('')
      router.reload()
    }
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



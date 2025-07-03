import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signedState, setSignedState] = useState("Sign In")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true)

    if(signedState === "Sign In"){
      await login(email, password)
    }
    else{
      await signup(name, email, password)
    }
    setLoading(false)
  }

  return (
    loading? <div className="login-spinner">
      <img src={netflix_spinner} alt="loading" />
    </div> :
    <div className='login'>
        <img src={logo} className="login-logo" alt="logo" />
        <div className="login-form">
          <h1>{signedState}</h1>
          <form>
            { signedState === 'Sign Up' ? <input type="text" name='name' value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Your Name' /> : null}

            <input type="email" name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' />
            <input type="password" name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />

            <button onClick={userAuth} type='submit'>{signedState}</button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>

          </form>
          <div className="form-switch">
            { signedState === 'Sign In' ? 
              <p>New to Netflix? <span onClick={() => setSignedState("Sign Up")}>Sign Up Now</span></p>
              : <p>Already have account? <span onClick={() =>  setSignedState("Sign In")}>Sign In Now</span></p>
            }
            
          </div>
        </div>
    </div>
  )
}

export default Login
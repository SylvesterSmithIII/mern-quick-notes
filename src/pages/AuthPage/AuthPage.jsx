import { useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {

  const [showBool, setShowBool] = useState(false)

  function handleClick() {
    setShowBool(!showBool)
  }
 
  return (
    <main>
      <h1>AuthPage</h1>
      <button onClick={handleClick}>Show {showBool ? "Sign Up Page" : "Login Page"}</button>
      <br /><br />
      {
        showBool ?
        <LoginForm setUser={setUser} />
        :
        <SignUpForm setUser={setUser} />
      }
    </main>
  );
}
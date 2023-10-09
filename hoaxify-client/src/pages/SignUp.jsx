import axios from "axios"
import { useState } from "react"

function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/v1/users', {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>SignUp</div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={onChangeUsername} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onChangeEmail} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} />
      </div>
      <button disabled={!password || password !== passwordConfirm}>Sign Up</button>
    </form>
  )
}

export default SignUp

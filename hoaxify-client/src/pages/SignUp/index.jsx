import axios from "axios"
import { useState } from "react"
import { signUp } from "./api"

function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [apiProgress, setApiProgress] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setApiProgress(true)
    try {
      const response = await signUp({ username, email, password })
      setSuccessMessage(response.data.message)
    } catch {

    } finally {
      setApiProgress(false)
      setUsername('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
    }
  }

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>SignUp</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input className="form-control" type="text" id="username" value={username} onChange={onChangeUsername} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control" type="email" id="email" value={email} onChange={onChangeEmail} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-control" type="password" id="password" value={password} onChange={onChangePassword} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordConfirm">Confirm Password</label>
              <input className="form-control" type="password" id="passwordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} />
            </div>
            <div className="text-center">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
            </div>
            <div className="text-center">
              {apiProgress
                ?
                <div className="spinner-border text-primary" role="status"> </div>
                :
                <button className="btn btn-primary" disabled={!password || password !== passwordConfirm}>
                  Sign Up
                </button>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

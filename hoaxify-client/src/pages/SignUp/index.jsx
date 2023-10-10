import axios from "axios"
import { useEffect, useState } from "react"
import { signUp } from "./api"

function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [apiProgress, setApiProgress] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  useEffect(() => {
    setErrors({})
  }, [username, email])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setApiProgress(true)
    try {
      const response = await signUp({ username, email, password })
      setSuccessMessage(response.data.message)
    } catch (error) {
      if (error.response?.data.validationErrors && error.response.data.status === 400) {
        setErrors(error.response.data.validationErrors)
      }else {
        setGeneralError('There is an unexpected error')
      }
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
              <input className={`form-control ${errors.username && 'is-invalid'}`} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input className={`form-control ${errors.email && 'is-invalid'}`} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-control" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="passwordConfirm">Confirm Password</label>
              <input className="form-control" type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>
            <div className="text-center">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {generalError && <div className="alert alert-danger">{generalError}</div>}
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

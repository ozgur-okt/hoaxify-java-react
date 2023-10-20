import { useEffect, useMemo, useState } from "react"
import { signUp } from "./api"
import Input from "./components/Input"
import { useTranslation } from "react-i18next"
import LanguageSelector from "../../shared/components/LanguageSelector"

function SignUp() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [apiProgress, setApiProgress] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  useEffect(() => {
    setErrors({ ...errors, username: undefined })
  }, [username])

  useEffect(() => {
    setErrors({ ...errors, email: undefined })
  }, [email])

  useEffect(() => {
    setErrors({ ...errors, password: undefined })
  }, [password])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setApiProgress(true)
    try {
      const response = await signUp({ username, email, password })
      setSuccessMessage(response.data.message)
    } catch (error) {
      if (error.response?.data && error.response.data.status === 400) {
        setErrors(error.response.data.validationErrors)
      } else if (error.response?.data && error.response.data.status === 502) {
        setGeneralError(error.response.data.message)
      }
       else {
        setGeneralError(t('genericError'))
      }
    } finally {
      setApiProgress(false)

    }
  }

  const passwordMismatchError = useMemo(() => {
    if (password !== passwordConfirm) {
      return t('passwordMismatch')
    }
    return null
  }, [password, passwordConfirm])

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t('signUp')}</h1>
          </div>
          <div className="card-body">
            <Input label={t('username')} error={errors.username} onChange={(e) => setUsername(e.target.value)} id="username" />
            <Input label={t('email')} error={errors.email} onChange={(e) => setEmail(e.target.value)} id="email" />
            <Input label={t('password')} error={errors.password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
            <Input label={t('passwordConfirm')} error={passwordMismatchError} onChange={(e) => setPasswordConfirm(e.target.value)} id="passwordConfirm" type="password" />
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
                  {t('signUp')}
                </button>
              }
            </div>
          </div>
        </form>
        <LanguageSelector />
      </div>
    </div>
  )
}

export default SignUp

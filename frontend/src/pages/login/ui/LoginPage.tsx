import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from 'features/auth/login'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onComplete = useCallback(() => {
    navigate(location.state?.returnUrl ?? '/')
  }, [navigate])

  return (
    <div>
      <h1>Login page</h1>
      <LoginForm onComplete={onComplete} />
    </div>
  )
}

export default LoginPage

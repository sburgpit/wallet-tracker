import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from 'features/auth/login'
import { Text } from 'shared/ui/Text'
import css from './LoginPage.module.scss'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onComplete = useCallback(() => {
    navigate(location.state?.returnUrl ?? '/')
  }, [navigate])

  return (
    <div className={css.LoginPage}>
      <Text tag='h1' size='title' font='second' weight={700}>
        Login
      </Text>
      <LoginForm onComplete={onComplete} />
    </div>
  )
}

export default LoginPage

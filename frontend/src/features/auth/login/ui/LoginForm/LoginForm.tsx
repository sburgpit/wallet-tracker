import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch } from 'shared/lib/hooks'
import { loginThunk } from '../../model/login'
import { type LoginFormSchema, loginFormSchema } from '../../model/loginFormSchema'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import css from './LoginForm.module.scss'

type Props = {
  onComplete?: () => void
}

export function LoginForm({ onComplete }: Props) {
  const dispatch = useAppDispatch()

  const {
    control,
    setError,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmitHandler = useCallback(
    ({ email, password }: LoginFormSchema) => {
      dispatch(loginThunk({ email, password }))
        .unwrap()
        .then(() => onComplete?.())
        .catch((error) => {
          console.log(error)
          setError('email', { type: 'server', message: error.message })
        })
    },
    [dispatch, onComplete, setError]
  )

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={css.Form}>
      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Input
            id='login-form-email'
            type='email'
            label='Email'
            error={errors.email?.message}
            disabled={isLoading}
            {...field}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Input
            id='login-form-password'
            type='password'
            label='Password'
            error={errors.password?.message}
            disabled={isLoading}
            {...field}
          />
        )}
      />
      <Button type='submit' loading={isLoading}>
        Send
      </Button>
    </form>
  )
}

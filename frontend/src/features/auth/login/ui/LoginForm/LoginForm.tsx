import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch } from 'shared/lib/hooks'
import { loginThunk } from '../../model/login'
import { type LoginFormSchema, loginFormSchema } from '../../model/loginFormSchema'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import css from './LoginForm.module.scss'

type LoginFormProps = {
  onComplete?: () => void
}

export function LoginForm({ onComplete }: LoginFormProps) {
  const dispatch = useAppDispatch()

  const {
    control,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmitHandler = useCallback(
    async ({ email, password }: LoginFormSchema) => {
      try {
        await dispatch(loginThunk({ email, password }))
        onComplete?.()
      } catch (e) {
        console.log(e)
        setError('email', { type: 'server', message: (e as Error).message })
      }
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            {...field}
          />
        )}
      />
      <Button type='submit' loading={isSubmitting}>
        Send
      </Button>
    </form>
  )
}

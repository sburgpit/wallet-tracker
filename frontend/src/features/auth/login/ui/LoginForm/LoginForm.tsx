import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'shared/lib/hooks'
import { loginThunk } from '../../model/login'
import { type LoginFormSchema, loginFormSchema } from '../../model/loginFormSchema'

type Props = {
  onComplete?: () => void
}

export function LoginForm({ onComplete }: Props) {
  const dispatch = useAppDispatch()

  const {
    setError,
    formState: { errors },
    handleSubmit,
    register,
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
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input type='email' {...register('email')} />
          <div>{errors.email?.message}</div>
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input type='password' {...register('password')} />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

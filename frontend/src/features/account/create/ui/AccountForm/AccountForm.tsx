import { useCurrenciesQuery } from 'entities/currency'
import { useMainButton, useTelegram } from 'entities/telegram'
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { Select } from 'shared/ui/Select'
import { Switch } from 'shared/ui/Switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks'
import { selectUserID } from 'entities/user'
import { AccountFormSchema, accountFormSchema } from '../../model/accountFormSchema'
import { createAccount } from '../../model/createAccount'
import { ErrorText } from 'shared/ui/Text'
import { useBankListQuery, useCreateBankMutation } from 'entities/bank'
import { setDataAndShowModal } from 'entities/modal'

type AccountFormProps = {
  onComplete?: (name: string) => void
}

export const AccountForm = (props: AccountFormProps) => {
  const { onComplete } = props
  const { expandApp } = useTelegram()
  const dispatch = useAppDispatch()
  const userID = useAppSelector(selectUserID)
  const { data: currencies, isFetching: currenciesIsFetching } = useCurrenciesQuery()
  const { data: banks, isFetching: banksIsFetching } = useBankListQuery(userID || '')
  const [createBank, { isSuccess, isLoading }] = useCreateBankMutation()

  useEffect(() => {
    expandApp()
  }, [])

  const defaultValues = { owner: userID }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  const onSumbitHandler = useCallback(
    async (body: AccountFormSchema) => {
      try {
        await dispatch(createAccount(body))
        onComplete?.(body.name)
      } catch (e) {
        console.log(e)
        setError('root', { type: 'server', message: (e as Error).message })
      }
    },
    [dispatch, onComplete, setError]
  )

  const onBankCreate = async () => {
    // const name = prompt('Bank name?')
    // if (name) {
    //   await createBank({ name, owner: userID || '' })
    //   return name
    // }
    dispatch(
      setDataAndShowModal({
        isShown: true,
        data: {
          title: 'Create Bank',
          subtitle: 'Create Bank account',
          buttons: ['close', { text: 'Save' }],
          children: (
            <div>
              <Input label='Name' />
            </div>
          ),
        },
      })
    )
  }

  useMainButton({ params: { text: 'Create' }, onClick: handleSubmit(onSumbitHandler) })

  const accountTypes = ['Card', 'Account', 'Crypto', 'Cash']
  const accountType = watch('type')

  return (
    <form className='flex flex-column gap-l'>
      <Controller
        name='type'
        control={control}
        defaultValue='Cash'
        render={({ field }) => (
          <Select
            options={accountTypes}
            label='Type'
            onChange={(value) => field.onChange(value?.[0])}
            error={errors.type?.message}
            disabled={isSubmitting}
            defaultValue='Cash'
          />
        )}
      />
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <Input label='Name' error={errors.name?.message} onChange={field.onChange} disabled={isSubmitting} />
        )}
      />
      {accountType === 'Crypto' ? (
        <Controller
          name='cryptoCurrency'
          control={control}
          render={({ field }) => (
            <Select
              options={['ETH', 'BTC', 'USD']}
              label='Crypto'
              searchable={true}
              onChange={(value) => field.onChange(value?.[0])}
              error={errors.cryptoCurrency?.message}
              disabled={isSubmitting}
            />
          )}
        />
      ) : (
        <Controller
          name='currency'
          control={control}
          render={({ field }) => (
            <Select
              options={currencies?.docs.map((currency) => ({
                label: `${currency.id} ${currency.sign}`,
                value: currency.id,
                search: currency.fullName,
              }))}
              label='Currency'
              isLoading={currenciesIsFetching}
              searchable={true}
              onChange={(value) => field.onChange(value?.[0])}
              error={errors.currency?.message}
              disabled={isSubmitting}
            />
          )}
        />
      )}

      <Controller
        name='bank'
        control={control}
        render={({ field }) => (
          <Select
            options={banks?.docs.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
            label='Bank'
            isLoading={banksIsFetching}
            searchable={true}
            onChange={(value) => field.onChange(value?.[0])}
            error={errors.bank?.message}
            disabled={isSubmitting}
            allowCreate={true}
            onCreate={onBankCreate}
          />
        )}
      />

      <Controller
        name='balance'
        control={control}
        defaultValue='0'
        render={({ field }) => (
          <Input
            label='Balance'
            type='number'
            defaultValue={'0'}
            onChange={field.onChange}
            error={errors.balance?.message}
            disabled={isSubmitting}
          />
        )}
      />
      <Controller
        name='includeToBalance'
        control={control}
        defaultValue={true}
        render={({ field }) => (
          <Switch
            label='Include in Balance'
            defaultValue={true}
            onChange={field.onChange}
            error={errors.includeToBalance?.message}
            disabled={isSubmitting}
          />
        )}
      />
      <Controller
        name='isSavings'
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Switch
            label='Savings'
            defaultValue={false}
            onChange={field.onChange}
            error={errors.isSavings?.message}
            disabled={isSubmitting}
          />
        )}
      />
      <Controller
        name='isArchived'
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Switch
            label='Archive'
            defaultValue={false}
            onChange={field.onChange}
            error={errors.isArchived?.message}
            disabled={isSubmitting}
          />
        )}
      />
      {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
      {import.meta.env.DEV && <Button onClick={handleSubmit(onSumbitHandler)}>Create</Button>}
    </form>
  )
}

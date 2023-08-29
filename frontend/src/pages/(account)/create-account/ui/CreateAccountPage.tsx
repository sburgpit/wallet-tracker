import { useCurrenciesQuery } from 'entities/currency'
import { useMainButton } from 'entities/telegram'
import { useState } from 'react'
import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { Select } from 'shared/ui/Select'
import { PageTitle, Text } from 'shared/ui/Text'
import { Page } from 'widgets/Page'

const CreateAccountPage = () => {
  const { data, isFetching } = useCurrenciesQuery()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const createAccountHandler = () => {}

  useMainButton({ params: { text: 'Create' }, isDisabled, onClick: createAccountHandler })

  const accountTypes = ['Card', 'Account', 'Crypto', 'Cash']
  
  return (
    <Page header={<PageTitle>Account Creation</PageTitle>}>
      <Button onClick={() => setIsDisabled((prev) => !prev)}>TOGGLE MAIN BUTTON</Button>
      <form className='flex flex-column gap-l'>
        <Select options={accountTypes} label='Type' />
        <Select
          options={data?.docs.map((currency) => ({
            label: `${currency.id} ${currency.sign}`,
            value: currency.id,
            search: currency.fullName,
          }))}
          label='Currency'
          isLoading={isFetching}
        />
        <Input label='Name' />
        <Input label='Balance' />
      </form>
    </Page>
  )
}

export default CreateAccountPage

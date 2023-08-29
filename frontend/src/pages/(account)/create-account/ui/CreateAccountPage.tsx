import { useMainButton } from 'entities/telegram'
import { useState } from 'react'
import { Input } from 'shared/ui/Input'
import { Select } from 'shared/ui/Select'
import { PageTitle, Text } from 'shared/ui/Text'
import { Page } from 'widgets/Page'

const CreateAccountPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const createAccountHandler = () => {}

  useMainButton({ params: { text: 'Create' }, isDisabled, onClick: createAccountHandler })

  const options = ['Card', 'Account', 'Crypto', 'Cash']

  return (
    <Page header={<PageTitle>Account Creation</PageTitle>}>
      <form className='flex flex-column gap-l'>
        <Select options={options} label='Type' />
        <Input label='Name' />
        <Input label='Balance' />
      </form>
    </Page>
  )
}

export default CreateAccountPage

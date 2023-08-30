import { useAccountsQuery } from 'entities/account'
import { selectUserID } from 'entities/user'
import { useAppSelector } from 'shared/lib/hooks'
import { Shimmer } from 'shared/ui/Shimmer'
import { Text } from 'shared/ui/Text'
import css from './Balance.module.scss'
import { useCallback } from 'react'

export const Balance = () => {
  const userID = useAppSelector(selectUserID)
  const { isLoading, data } = useAccountsQuery(userID || '')

  const getBalance = useCallback(() => {
    if (!data) return 0
    return data.docs.reduce((prev, curr) => (prev += curr.balance), 0)
  }, [data])

  if (!userID) return null

  return (
    <div className={'flex flex-column align-center gap-l'}>
      <Text weight={500}>Balance</Text>
      {isLoading ? (
        <Shimmer width={200} height={52} />
      ) : (
        <div className='flex'>
          <Text
            tag='span'
            font='second'
            style={{ fontSize: 36, marginRight: 12 }}
            color='hint'
            className='align-self-center'>
            $
          </Text>
          <Text
            tag='h1'
            font='second'
            size='title'
            weight={700}
            className='flex align-center gap-s'
            color='primary'
            style={{ fontSize: 64 }}>
            {Number(getBalance().toFixed(0).split('.')[0]).toLocaleString('ru-RU').replace(/,/g, ' ')}
          </Text>
          <Text
            tag='span'
            font='second'
            style={{ fontSize: 36, marginBottom: 3 }}
            color='hint'
            className='align-self-end'>
            .{getBalance().toFixed(2).split('.')[1]}
          </Text>
        </div>
      )}
    </div>
  )
}

import { Text } from './Text'

type PageTitleProps = {
  children: string
}

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Text font='second' color='hint' weight={500}>
      {children}
    </Text>
  )
}

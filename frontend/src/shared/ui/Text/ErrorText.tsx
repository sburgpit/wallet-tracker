import { Text } from './Text'

type ErrorTextProps = {
  children: React.ReactNode
  className?: string
}

export const ErrorText = ({ children, className }: ErrorTextProps) => {
  return (
    <Text color='dangerous' tag='span' size='small' className={className}>
      {children}
    </Text>
  )
}

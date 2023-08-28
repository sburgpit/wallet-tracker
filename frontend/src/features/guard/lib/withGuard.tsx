import { AuthGuard } from '../ui/AuthGuard/AuthGuard'
import { GuestGuard } from '../ui/GuestGuard/GuestGuard'

export type Guard = 'Guest' | 'Auth'
type WithGuards = (guards?: Guard[] | null) => GuardComponent
type GuardComponent = (children: React.ReactNode) => React.ReactNode

const guardsList: Record<Guard, GuardComponent> = {
  Guest: (children) => <GuestGuard>{children}</GuestGuard>,
  Auth: (children) => <AuthGuard>{children}</AuthGuard>,
}

export const withGuard: WithGuards = (guards) => (children: React.ReactNode) =>
  guards?.reduceRight((child, guard) => guardsList[guard](child), children) || children

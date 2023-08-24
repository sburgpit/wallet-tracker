import { GuestGuard } from '../ui/GuestGuard/GuestGuard'

type Guards = 'Guest'
type WithGuards = (guards?: Guards[] | null) => GuardComponent
type GuardComponent = (children: React.ReactNode) => React.ReactNode

const guardsList: Record<Guards, GuardComponent> = {
  Guest: (children) => <GuestGuard>{children}</GuestGuard>,
}

export const withGuard: WithGuards = (guards) => (children: React.ReactNode) =>
  guards?.reduceRight((child, guard) => guardsList[guard](child), children) || children

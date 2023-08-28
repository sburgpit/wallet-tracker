import { Loader } from 'shared/ui/Loader'
import css from './PageLoader.module.scss'

export const PageLoader = () => {
  return (
    <div className={css.PageLoader}>
      <Loader size={80} rotationSpeed={1.2} color='var(--button-color)' />
    </div>
  )
}

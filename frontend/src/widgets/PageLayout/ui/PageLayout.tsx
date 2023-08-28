import { useTelegram } from 'entities/telegram'
import { Outlet } from 'react-router-dom'
import { cn } from 'shared/lib/utils/classNames'
import css from './PageLayout.module.scss'

export const PageLayout = () => {
  const { isExpanded } = useTelegram()

  return (
    <div className={cn(css.PageLayout, { [css.PageLayout_isExpanded]: isExpanded })}>
      <div>isExpanded: {isExpanded}</div>
      <Outlet />
    </div>
  )
}

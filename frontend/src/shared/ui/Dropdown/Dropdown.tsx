import { cn } from 'shared/lib/utils/classNames'
import css from './Dropdown.module.scss'
import { useRef, useState, useEffect } from 'react'
import { useOnClickOutside } from 'shared/lib/hooks'

type DropdownProps = {
  trigger: ((isOpen: boolean) => React.ReactNode) | React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Dropdown = (props: DropdownProps) => {
  const { trigger, children, className } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [positionAbove, setPositionAbove] = useState<boolean>(false)
  const [positionLeft, setPositionLeft] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const dropedRef = useRef<HTMLDivElement | null>(null)

  const toggleOpen = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    if (isOpen && containerRef.current && dropedRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const dropedHeight = dropedRef.current.offsetHeight
      const dropedWidth = dropedRef.current.offsetWidth

      setPositionAbove(rect.bottom + dropedHeight > window.innerHeight)
      setPositionLeft(rect.right + dropedWidth > window.innerWidth)
    }
  }, [isOpen])

  useOnClickOutside(containerRef, () => setIsOpen(false))

  return (
    <div className={cn(css.Dropdown, className, { [css.Dropdown_isOpen]: isOpen })} ref={containerRef}>
      <div className={css.Dropdown__Trigger} onClick={toggleOpen}>
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>
      <div
        className={cn(css.Dropdown__Droped, {
          [css.Dropdown__Droped_position_above]: positionAbove,
          [css.Dropdown__Droped_position_left]: positionLeft,
        })}
        ref={dropedRef}>
        {children}
      </div>
    </div>
  )
}

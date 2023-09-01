import { cn } from 'shared/lib/utils/classNames'
import css from './Dropdown.module.scss'
import { useRef, useState, useEffect } from 'react'
import { useOnClickOutside } from 'shared/lib/hooks'

type DropdownOption = {
  label: string
  value?: string | number | boolean
  onClick: (value?: string | number | boolean) => void
}

type DropdownProps = {
  options: DropdownOption[]
  children: ((isOpen: boolean) => React.ReactNode) | React.ReactNode
  className?: string
  onClick?: (value?: string | number | boolean) => void
}

export const Dropdown = (props: DropdownProps) => {
  const { children, className, options, onClick } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [positionAbove, setPositionAbove] = useState<boolean>(false)
  const [positionLeft, setPositionLeft] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const dropedRef = useRef<HTMLDivElement | null>(null)

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

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const clickHandler = (value?: string | number | boolean) => onClick?.(value)

  return (
    <div className={cn(css.Dropdown, className, { [css.Dropdown_isOpen]: isOpen })} ref={containerRef}>
      <div className={css.Dropdown__Trigger} onClick={toggleOpen}>
        {typeof children === 'function' ? children(isOpen) : children}
      </div>
      <div
        className={cn(css.Dropdown__Droped, {
          [css.Dropdown__Droped_position_above]: positionAbove,
          [css.Dropdown__Droped_position_left]: positionLeft,
        })}
        ref={dropedRef}>
        {options.map(({ label, onClick, value }) => (
          <div
            key={label}
            className={css.Dropdown__Droped__Item}
            onClick={() => {
              clickHandler(value)
              onClick?.(value)
            }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

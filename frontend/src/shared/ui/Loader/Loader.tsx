import css from './Loader.module.scss'

type LoaderProps = {
  rotationSpeed?: number
  color?: string
  size?: number
}

export const Loader = (props: LoaderProps) => {
  const { rotationSpeed = 0.8, color = 'var(--text-color)', size = 16 } = props
  const circleRadius = 13
  const circleCircumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circleCircumference * 0.3

  return (
    <span className={css.Loader}>
      <svg width={size} height={size} viewBox='0 0 32 32'>
        <circle
          cx='16'
          cy='16'
          r={circleRadius}
          fill='none'
          strokeWidth='3'
          strokeLinecap='round'
          stroke={color}
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            animation: `rotate ${rotationSpeed}s linear infinite`,
          }}
        />
      </svg>
    </span>
  )
}

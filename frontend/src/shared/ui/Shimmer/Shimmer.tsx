import css from './Shimmer.module.scss'

type ShimmerProps = {
  width: number | string
  height: number | string
}

export const Shimmer = ({ width, height }: ShimmerProps) => <div className={css.Shimmer} style={{ height, width }} />

const SIZES = {
  small: 28,
  medium: 36,
}

export default function Monogram({ size = 'medium', title = 'João Pedro Amaral' }) {
  const pixels = SIZES[size]

  return (
    <svg
      width={pixels}
      height={pixels}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className="shrink-0"
    >
      <rect width="64" height="64" rx="15" className="fill-raised" />
      <g
        fill="none"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      >
        <path d="M27 17 V39 C27 45.5 22 48.5 17.5 45.5" />
        <path d="M27 17 H38.5 C46 17 46 30 38.5 30 H27" />
      </g>
    </svg>
  )
}

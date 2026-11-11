/* Hand-drawn decorative SVGs. All are aria-hidden: purely ornamental. */

export function Chili({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 60" aria-hidden="true">
      <path
        d="M14 34c10-12 34-20 58-18 14 1 26 6 34 14 3 3 0 7-4 6-20-5-46 6-70 8-10 1-20-2-18-10z"
        fill="#C8161E"
      />
      <path
        d="M24 30c14-6 34-10 52-8"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M106 30c4-4 6-10 10-12" stroke="#3F7D20" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M100 26c4 0 8 2 9 6" stroke="#3F7D20" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function CurryLeaf({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 120" aria-hidden="true">
      <path d="M30 4C52 30 54 74 30 112 6 74 8 30 30 4z" fill="#3F7D20" />
      <path d="M30 14v96" stroke="#9BC46F" strokeWidth="2" />
      {[30, 46, 62, 78].map((y) => (
        <g key={y} stroke="#9BC46F" strokeWidth="1.4" fill="none">
          <path d={`M30 ${y}l12 -8`} />
          <path d={`M30 ${y}l-12 -8`} />
        </g>
      ))}
    </svg>
  )
}

export function StarAnise({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 50 50)`}>
          <ellipse cx="50" cy="24" rx="10" ry="22" fill="#7A3B12" />
          <ellipse cx="50" cy="20" rx="4" ry="7" fill="#C97A2B" />
        </g>
      ))}
      <circle cx="50" cy="50" r="8" fill="#4E230A" />
    </svg>
  )
}

export function Cardamom({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 40" aria-hidden="true">
      <path d="M6 20C18 4 56 2 74 20 56 38 18 36 6 20z" fill="#8DB255" />
      <path d="M14 20h52" stroke="#5E8A2E" strokeWidth="2" />
      <path d="M22 13c10 4 26 4 36 0M22 27c10-4 26-4 36 0" stroke="#5E8A2E" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function Sparkle({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0c2 11 9 18 20 20-11 2-18 9-20 20-2-11-9-18-20-20C11 18 18 11 20 0z" fill="currentColor" />
    </svg>
  )
}

/** Rangoli-like mandala used as a slow rotating background ornament. */
export function Mandala({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1">
        {[90, 74, 58, 40, 22].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} strokeDasharray={r % 2 ? '2 5' : undefined} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
            <path d="M100 10c8 14 8 26 0 38-8-12-8-24 0-38z" />
            <path d="M100 52c5 8 5 14 0 20-5-6-5-12 0-20z" />
            <circle cx="100" cy="82" r="2.5" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export function VegMark({ veg }) {
  return (
    <span
      className={`vegmark ${veg ? 'is-veg' : 'is-nonveg'}`}
      role="img"
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      title={veg ? 'Vegetarian' : 'Non-vegetarian'}
    />
  )
}

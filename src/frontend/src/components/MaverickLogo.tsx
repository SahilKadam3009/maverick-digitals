export function MaverickLogo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const id = `ml-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Maverick Digitals logo"
    >
      <title>Maverick Digitals</title>
      <defs>
        {/* Primary gradient: deep purple → cyan */}
        <linearGradient
          id={`${id}-grad`}
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="55%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Metallic sheen overlay */}
        <linearGradient
          id={`${id}-sheen`}
          x1="8"
          y1="2"
          x2="40"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="45%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0.12" />
        </linearGradient>

        {/* Glow filter for depth */}
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Inner shadow */}
        <filter id={`${id}-inner`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
          <feOffset dx="0" dy="1" result="offset" />
          <feComposite in="SourceGraphic" in2="offset" operator="over" />
        </filter>
      </defs>

      {/*
        Outer shield / hexagonal crest shape:
        Symmetrical 6-point polygon with:
        - flat top edge
        - angled shoulders
        - straight sides
        - sharply pointed bottom
        Points (clockwise from top-left):
        (10, 4) → (38, 4) → (46, 18) → (24, 46) → (2, 18)
        This gives a 5-sided shield/pennant crest
      */}
      <polygon
        points="10,3 38,3 46,18 24,46 2,18"
        fill={`url(#${id}-grad)`}
        filter={`url(#${id}-glow)`}
      />

      {/* Sheen overlay on shield */}
      <polygon points="10,3 38,3 46,18 24,46 2,18" fill={`url(#${id}-sheen)`} />

      {/* Thin border outline for crispness */}
      <polygon
        points="10,3 38,3 46,18 24,46 2,18"
        fill="none"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="0.6"
      />

      {/*
        Bold M letterform inside the shield.
        The M uses sharp angular construction:
        - Two tall outer verticals
        - Two inner diagonals meeting at center-low
        - Top of each peak has a V-cut notch for crown-like silhouette
        Coordinate system: shield interior ~x:8-40, y:8-38

        M path:
        Left outer vertical: (9, 34) up to (9, 9)
        Left peak V-cut: narrow notch at (12, 14) dipping to (14.5, 19)
        Center valley: diagonals meet at (24, 26)
        Right peak V-cut: notch at (33.5, 19) up to (36, 14)
        Right outer vertical: (39, 9) down to (39, 34)
        Inner right diagonal up: (34, 34) to (24, 21)
        Inner left diagonal: (24, 21) to (14, 34)

        Full filled M shape (single closed path):
      */}
      <path
        d="
          M 9 34
          L 9 10
          L 13.5 10
          L 14 15
          L 15.5 18.5
          L 24 26.5
          L 32.5 18.5
          L 34 15
          L 34.5 10
          L 39 10
          L 39 34
          L 34.5 34
          L 34.5 22
          L 24 30.5
          L 13.5 22
          L 13.5 34
          Z
        "
        fill="white"
        fillOpacity="0.95"
        filter={`url(#${id}-inner)`}
      />

      {/* V-notch cuts at the top of each M peak (dark cutout for crown effect) */}
      <path
        d="M 13.5 10 L 14 15 L 15.5 18.5 L 17 15 L 17 10 Z"
        fill={`url(#${id}-grad)`}
        fillOpacity="0.9"
      />
      <path
        d="M 31 10 L 31 15 L 32.5 18.5 L 34 15 L 34.5 10 Z"
        fill={`url(#${id}-grad)`}
        fillOpacity="0.9"
      />
    </svg>
  );
}

const MantaRayLogo = ({ className = "", size = 64, opacity = 1 }: { className?: string; size?: number; opacity?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
  >
    <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Manta ray body - stylized with parallel lines */}
    <path
      d="M100 50 C60 50, 30 80, 25 100 C20 120, 40 140, 60 145 L100 155 L140 145 C160 140, 180 120, 175 100 C170 80, 140 50, 100 50Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
    {/* Parallel detail lines */}
    <path d="M50 85 Q100 65, 150 85" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M45 95 Q100 75, 155 95" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M40 105 Q100 85, 160 105" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M45 115 Q100 95, 155 115" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M55 125 Q100 108, 145 125" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Tail */}
    <path d="M100 155 L100 175" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M95 170 L100 180 L105 170" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Eyes */}
    <circle cx="75" cy="90" r="3" fill="currentColor" />
    <circle cx="125" cy="90" r="3" fill="currentColor" />
  </svg>
);

export default MantaRayLogo;

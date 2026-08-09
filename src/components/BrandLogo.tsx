type BrandLogoProps = {
  width?: number | string
  adaptive?: boolean
  alt?: string
}

export default function BrandLogo({ width = 150, adaptive = true, alt = 'Adhugraphics' }: BrandLogoProps) {
  return (
    <img
      src="/assets/adhugraphics-logo.png"
      alt={alt}
      className={`brand-logo${adaptive ? ' brand-logo--adaptive' : ''}`}
      style={{ width }}
    />
  )
}

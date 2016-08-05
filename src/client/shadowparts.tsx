
const ShadowPartLeft = (properties:MoonProps) => {
  
  const {illumination, size} = properties
  const {fraction, phase} = illumination

  const height = phase < 0.5 ? 
    ((size) * (1 + fraction) * 1) + 8 :
    (size + 8)
  const width = height

  const borderRadius = phase < 0.5 ? 
    50 * (1 - fraction) + (fraction * 30) :
    0

  const translateX = phase < 0.5 ? 
    (width - size) / 2 :
    ((size / 2) + 2)
  const translateY = (height - size) / 2

  return (
    <div style={{
      position: 'absolute',
      zIndex: 3,
      height: `${height}px`,
      width: `${height}px`,
      top: '-2px',
      borderRadius: `${borderRadius}%`,
      left: `-2px` ,
      transform: `translate(${translateX}px, -${translateY}px)`, 
      backgroundColor: colors.moonShadow
    }}/>
  )
}

const ShadowPartRight = (properties:MoonProps) => {
  
  const {illumination, size} = properties
  const {fraction, phase} = illumination
  
  const pl = 0.45

  const height = phase < pl ? 
    size + 8 :
    ((size) * (1 + fraction) * 1) + 8
  const width = height

  const borderRadius = phase < pl ? 
    0 :
    50 * (1 - fraction) + (fraction * 30)

  const translateX = phase < pl ? 
    -(width / 2) -4 :
    -(width) + (size / 2) + ((1 - fraction) * (size / 2))
  const translateY = (height - size) / 2

  return (
    <div style={{
      position: 'absolute',
      zIndex: phase < pl ? 2 : 3,
      height: `${height}px`,
      width: `${height}px`,
      top: '-2px',
      borderRadius: `${borderRadius}%`,
      left: `-2px` ,
      transform: `translate(${translateX}px, -${translateY}px)`, 
      backgroundColor: colors.moon
    }}/>
  )
}
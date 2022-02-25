interface DefilingTextProps {
  value: string
  className?: string
}

const DefilingText = ({ value, className }: DefilingTextProps) => {
  return <p className={`${className} overflow-hidden`}>{value}</p>
}

export default DefilingText

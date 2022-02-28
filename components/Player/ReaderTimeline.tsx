import { useState } from 'react'

const ReaderTimeline = () => {
  const [currentTime, setCurrentTime] = useState<number>(0)

  return (
    <div className="w-max ml-auto mr-auto bg-gry">
      <input
        type="range"
        value={currentTime}
        min="0"
        max="100"
        className="w-full pr-4 pl-4 bg-gry h-1"
        onChange={(e) => setCurrentTime(parseInt(e.target.value))}
      />
    </div>
  )
}

export default ReaderTimeline

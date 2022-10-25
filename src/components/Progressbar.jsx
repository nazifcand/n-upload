import { useEffect, useState } from "react"

const Progressbar = ({ value, max }) => {

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let percent = (value * 100) / max
    setPercent(percent >= 100 ? 100 : percent)
  }, [value, percent])

  return <div className="progressbar">
    <div className="bar" style={{ width: `${percent}%` }}></div>
  </div>
}

export default Progressbar

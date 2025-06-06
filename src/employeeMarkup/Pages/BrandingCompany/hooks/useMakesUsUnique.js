

import { useState } from "react"

export const useMakesUsUnique = () => {
  const [makesUsUnique, setMakesUsUnique] = useState([])

  return {
    makesUsUnique,
    setMakesUsUnique,
  }
}

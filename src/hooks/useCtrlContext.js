
import { CtrlContext } from "../context/CtrlContext"
import { useContext } from "react"

export const useCtrlContext = () => {
  const context = useContext(CtrlContext)

  if(!context) {
    throw Error('useCtrlContext must be used inside an CtrlContextProvider')
  }

  return context
}
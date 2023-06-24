import { eventBus } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'

export function UserMsg() {

  const [msg, setMsg] = useState()
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 1800)
    })

  
    return () => {
      unsubscribe()
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.txt}
    </section>
  )
}
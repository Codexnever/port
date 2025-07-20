"use client"

import { useEffect } from "react"

export default function DayNightBackground() {
  useEffect(() => {
    const hour = new Date().getHours()
    const isDay = hour >= 6 && hour < 18
    document.body.classList.toggle("night-bg", isDay)
    document.body.classList.toggle("night-bg", !isDay)
    // console.log(isDay ? "Day background active" : "Night background active")
  }, [])
  return null
}

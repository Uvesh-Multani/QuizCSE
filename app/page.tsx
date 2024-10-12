"use client"

import { useState } from "react"
import LandingPage from "@/components/LandingPage"
import QuizApp from "@/components/QuizApp"

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)

  const handleStart = () => {
    setShowQuiz(true)
  }

  return (
    <main>
      {showQuiz ? (
        <QuizApp />
      ) : (
        <LandingPage onStart={handleStart} />
      )}
    </main>
  )
}
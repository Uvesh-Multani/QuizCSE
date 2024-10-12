import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Highlight, themes } from "prism-react-renderer"

interface QuizQuestionProps {
  question: {
    question: string
    options: string[]
    correctAnswer: string
  }
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

export default function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer)
          onAnswer(false)
          return 30
        }
        return prevTime - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onAnswer])

  const handleAnswer = () => {
    onAnswer(selectedAnswer === question.correctAnswer)
    setSelectedAnswer("")
    setTimeLeft(30)
  }

  const renderQuestion = () => {
    if (question.question.includes("```")) {
      const [questionText, codeSnippet] = question.question.split("```")
      return (
        <>
          <p className="text-xl mb-4">{questionText.trim()}</p>
          <Highlight theme={themes.nightOwl} code={codeSnippet.trim()} language="python">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} p-4 rounded-md mb-4`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    <span className="mr-4 opacity-50">{i + 1}</span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </>
      )
    } else {
      return <p className="text-xl mb-4">{question.question}</p>
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Question {questionNumber}</h2>
        <Progress value={(questionNumber / totalQuestions) * 100} className="mb-4" />
        {renderQuestion()}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "default" : "outline"}
              onClick={() => setSelectedAnswer(option)}
              className="py-8 text-lg"
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Time left: {timeLeft}s</p>
          <Button onClick={handleAnswer} disabled={!selectedAnswer}>
            Next Question
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import QuizQuestion from "./QuizQuestion"
import QuizResult from "./QuizResult"

const questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Unit", "Central Processing Utility"],
    correctAnswer: "Central Processing Unit",
  },
  {
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correctAnswer: "O(log n)",
  },
  {
    question: "Which of the following is not an object-oriented programming language?",
    options: ["Java", "C++", "C", "Python"],
    correctAnswer: "C",
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Structured Question Language", "Simple Question Language"],
    correctAnswer: "Structured Query Language",
  },
  {
    question: "What is the purpose of a firewall in computer networks?",
    options: ["Increase internet speed", "Filter network traffic", "Boost CPU performance", "Enhance graphics"],
    correctAnswer: "Filter network traffic",
  },
  {
    question: "Which of the following is a type of NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: "MongoDB",
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which protocol is used for sending email?",
    options: ["HTTP", "FTP", "SMTP", "TCP"],
    correctAnswer: "SMTP",
  },
  {
    question: "What is the purpose of an IDE?",
    options: ["Run programs", "Debug code", "Write and edit code", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "What will be the output of the following code?\n\n```python\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)\n```",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 3, [4]]", "Error"],
    correctAnswer: "[1, 2, 3, 4]",
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Automated Program Interaction", "Advanced Programming Integration", "Application Process Integration"],
    correctAnswer: "Application Programming Interface",
  },
  {
    question: "Which of the following is a version control system?",
    options: ["Git", "Java", "Python", "C++"],
    correctAnswer: "Git",
  },
  {
    question: "What is the main function of an operating system?",
    options: ["Run applications", "Manage hardware resources", "Provide user interface", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "Which layer of the OSI model is responsible for routing?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correctAnswer: "Network Layer",
  },
  {
    question: "What is the output of this JavaScript code?\n\n```javascript\nconsole.log(typeof typeof 1);\n```",
    options: ["number", "string", "undefined", "NaN"],
    correctAnswer: "string",
  },
  {
    question: "What will this Python code print?\n\n```python\nprint(list(filter(lambda x: x % 2 == 0, range(10))))\n```",
    options: ["[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", "[1, 3, 5, 7, 9]", "[0, 2, 4, 6, 8]", "[]"],
    correctAnswer: "[0, 2, 4, 6, 8]",
  },
  {
    question: "What is the result of this C++ code?\n\n```cpp\n#include <iostream>\nint main() {\n    int x = 5;\n    std::cout << x++ << \" \" << ++x;\n    return 0;\n}\n```",
    options: ["5 6", "5 7", "6 6", "6 7"],
    correctAnswer: "5 7",
  },
  {
    question: "What will be the output of this Java code?\n\n```java\nString s1 = \"Hello\";\nString s2 = new String(\"Hello\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));\n```",
    options: ["true true", "true false", "false true", "false false"],
    correctAnswer: "false true",
  },
  {
    question: "What is the time complexity of this function?\n\n```python\ndef mystery(n):\n    if n <= 1:\n        return 1\n    return mystery(n-1) + mystery(n-2)\n```",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(2^n)"],
    correctAnswer: "O(2^n)",
  },
]

// Shuffle the questions array
const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)

export default function QuizApp() {
  const [userName, setUserName] = useState("")
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error])

  const startQuiz = async () => {
    if (userName.trim()) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName }),
        })
        if (!response.ok) {
          throw new Error('Failed to save user')
        }
        setQuizStarted(true)
      } catch (error) {
        console.error('Error saving user:', error)
        setError('Failed to save user. Please try again.')
      }
    } else {
      setError('Please enter your name before starting the quiz.')
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => setError(null)}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md" // Adjusted width here
        >
          <h1 className="text-3xl font-bold text-center mb-6">Quiz CSE</h1>
          <Input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mb-4"
          />
          <Button onClick={startQuiz} className="w-full">
            Start Quiz
          </Button>
        </motion.div>
      </div>
    )
  }
  

  if (showResult) {
    return (
      <QuizResult
        userName={userName} // Pass the userName here
        score={score}
        totalQuestions={shuffledQuestions.length}
      />
    );
  }
  
  return (
    <QuizQuestion
      question={shuffledQuestions[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={shuffledQuestions.length}
      onAnswer={handleAnswer}
    />
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { toast } from "@/hooks/use-toast"
// import QuizQuestion from "./QuizQuestion"
// import QuizResult from "./QuizResult"
// import { Button } from "./ui/button"

// const questions = [
//     {
//       question: "What does CPU stand for?",
//       options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Unit", "Central Processing Utility"],
//       correctAnswer: "Central Processing Unit",
//     },
//     {
//       question: "Which data structure uses LIFO?",
//       options: ["Queue", "Stack", "Linked List", "Tree"],
//       correctAnswer: "Stack",
//     },
//     {
//       question: "What is the time complexity of binary search?",
//       options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
//       correctAnswer: "O(log n)",
//     },
//     {
//       question: "Which of the following is not an object-oriented programming language?",
//       options: ["Java", "C++", "C", "Python"],
//       correctAnswer: "C",
//     },
//     {
//       question: "What does SQL stand for?",
//       options: ["Structured Query Language", "Simple Query Language", "Structured Question Language", "Simple Question Language"],
//       correctAnswer: "Structured Query Language",
//     },
//     {
//       question: "What is the purpose of a firewall in computer networks?",
//       options: ["Increase internet speed", "Filter network traffic", "Boost CPU performance", "Enhance graphics"],
//       correctAnswer: "Filter network traffic",
//     },
//     {
//       question: "Which of the following is a type of NoSQL database?",
//       options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
//       correctAnswer: "MongoDB",
//     },
//     {
//       question: "What does HTML stand for?",
//       options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
//       correctAnswer: "Hyper Text Markup Language",
//     },
//     {
//       question: "Which protocol is used for sending email?",
//       options: ["HTTP", "FTP", "SMTP", "TCP"],
//       correctAnswer: "SMTP",
//     },
//     {
//       question: "What is the purpose of an IDE?",
//       options: ["Run programs", "Debug code", "Write and edit code", "All of the above"],
//       correctAnswer: "All of the above",
//     },
//     {
//       question: "What will be the output of the following code?\n\n```python\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)\n```",
//       options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 3, [4]]", "Error"],
//       correctAnswer: "[1, 2, 3, 4]",
//     },
//     {
//       question: "What does API stand for?",
//       options: ["Application Programming Interface", "Automated Program Interaction", "Advanced Programming Integration", "Application Process Integration"],
//       correctAnswer: "Application Programming Interface",
//     },
//     {
//       question: "Which of the following is a version control system?",
//       options: ["Git", "Java", "Python", "C++"],
//       correctAnswer: "Git",
//     },
//     {
//       question: "What is the main function of an operating system?",
//       options: ["Run applications", "Manage hardware resources", "Provide user interface", "All of the above"],
//       correctAnswer: "All of the above",
//     },
//     {
//       question: "Which layer of the OSI model is responsible for routing?",
//       options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
//       correctAnswer: "Network Layer",
//     },
//     {
//       question: "What is the output of this JavaScript code?\n\n```javascript\nconsole.log(typeof typeof 1);\n```",
//       options: ["number", "string", "undefined", "NaN"],
//       correctAnswer: "string",
//     },
//     {
//       question: "What will this Python code print?\n\n```python\nprint(list(filter(lambda x: x % 2 == 0, range(10))))\n```",
//       options: ["[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", "[1, 3, 5, 7, 9]", "[0, 2, 4, 6, 8]", "[]"],
//       correctAnswer: "[0, 2, 4, 6, 8]",
//     },
//     {
//       question: "What is the result of this C++ code?\n\n```cpp\n#include <iostream>\nint main() {\n    int x = 5;\n    std::cout << x++ << \" \" << ++x;\n    return 0;\n}\n```",
//       options: ["5 6", "5 7", "6 6", "6 7"],
//       correctAnswer: "5 7",
//     },
//     {
//       question: "What will be the output of this Java code?\n\n```java\nString s1 = \"Hello\";\nString s2 = new String(\"Hello\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));\n```",
//       options: ["true true", "true false", "false true", "false false"],
//       correctAnswer: "false true",
//     },
//     {
//       question: "What is the time complexity of this function?\n\n```python\ndef mystery(n):\n    if n <= 1:\n        return 1\n    return mystery(n-1) + mystery(n-2)\n```",
//       options: ["O(n)", "O(log n)", "O(n^2)", "O(2^n)"],
//       correctAnswer: "O(2^n)",
//     },
//   ]

// // Shuffle the questions array
// const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)

// export default function QuizApp() {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [score, setScore] = useState(0)
//   const [showResult, setShowResult] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (error) {
//       toast({
//         title: "Error",
//         description: error,
//         variant: "destructive",
//       })
//     }
//   }, [error])

//   const handleAnswer = (isCorrect: boolean) => {
//     if (isCorrect) {
//       setScore(score + 1)
//     }

//     if (currentQuestion < shuffledQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//     } else {
//       setShowResult(true)
//     }
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-100">
//         <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Error</h2>
//           <p className="text-red-600 mb-4">{error}</p>
//           <Button onClick={() => setError(null)}>Try Again</Button>
//         </div>
//       </div>
//     )
//   }

//   if (showResult) {
//     return <QuizResult score={score} totalQuestions={shuffledQuestions.length} />
//   }

//   return (
//     <QuizQuestion
//       question={shuffledQuestions[currentQuestion]}
//       questionNumber={currentQuestion + 1}
//       totalQuestions={shuffledQuestions.length}
//       onAnswer={handleAnswer}
//     />
//   )
// }
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  userName: string; // Include userName in the props
  score: number;
  totalQuestions: number;
}

export default function QuizResult({ userName, score, totalQuestions }: QuizResultProps) {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">Great job, {userName}! You scored:</p> {/* Include userName here */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-5xl font-bold text-blue-600 mb-4"
        >
          {percentage}%
        </motion.div>
        <p className="text-lg mb-6">
          You got {score} out of {totalQuestions} questions correct.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </motion.div>
    </div>
  );
}

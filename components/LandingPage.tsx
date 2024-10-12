import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Clock, Code } from "lucide-react"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-500 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Quiz CSE</h1>
        <p className="text-xl md:text-2xl">Test your computer science knowledge!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        <FeatureCard
          icon={<Brain className="w-12 h-12 mb-4" />}
          title="20 Challenging Questions"
          description="Cover a wide range of CS topics"
        />
        <FeatureCard
          icon={<Code className="w-12 h-12 mb-4" />}
          title="Code-based Questions"
          description="Test your coding skills with real snippets"
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 mb-4" />}
          title="Timed Responses"
          description="30 seconds per question to keep you on your toes"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}  // Add scale effect on hover
      >
        <Button onClick={onStart} size="lg" className="text-lg">
          Start Quiz <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white bg-opacity-20 p-6 rounded-lg text-center flex flex-col items-center"
      whileHover={{ scale: 1.05 }}  // Add scale effect on hover
    >
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </motion.div>
  )
}

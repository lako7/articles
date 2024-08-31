// components/AnimatedBookOpen.tsx
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedBookOpen = () => {
    return (
        <motion.div
            animate={{
                y: [0, -5, 0, 5, 0], // Slight vertical movement
            }}
            transition={{
                duration: 2, // Duration of the animation cycle
                ease: "easeInOut",
                repeat: Infinity, // Repeat the animation infinitely
                repeatType: "loop", // Loop the animation
            }}
        >
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto" />
        </motion.div>
    );
};

export default AnimatedBookOpen;

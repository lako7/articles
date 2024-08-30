// components/ScrollToTopButton.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            className={`fixed bottom-4 right-4 p-2 bg-emerald-500 text-white rounded-full shadow-lg ${
                showScrollTop ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <ChevronUp className="w-6 h-6" />
        </motion.button>
    );
}

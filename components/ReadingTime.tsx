// components/ReadingTime.tsx
"use client";

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface ReadingTimeProps {
    content: string | { id: string; title: string; text: string }[];
}

export default function ReadingTime({ content }: ReadingTimeProps) {
    const [readingTime, setReadingTime] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const calculateReadingTime = () => {
                let textContent = '';

                if (Array.isArray(content)) {
                    textContent = content.map(section => section.text).join(' ');
                } else if (typeof content === 'string') {
                    textContent = content;
                }

                const wpm = 225;
                const words = textContent.trim().split(/\s+/).length;
                const time = Math.ceil(words / wpm);
                setReadingTime(time);
            };

            calculateReadingTime();
        }
    }, [content]);

    return (
        <span className="flex items-center text-sm text-gray-600 mt-7">
            <Clock className="w-4 h-4 mr-1" /> {readingTime} min read
        </span>
    );
}

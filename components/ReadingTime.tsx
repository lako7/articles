"use client";

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { PortableTextBlock } from '@portabletext/types';

interface ReadingTimeProps {
    content: PortableTextBlock[]; // Adjusted type
}

export default function ReadingTime({ content }: ReadingTimeProps) {
    const [readingTime, setReadingTime] = useState<number>(1);

    useEffect(() => {
        const calculateReadingTime = () => {
            let textContent = '';

            // Extract text from PortableTextBlocks
            content.forEach(block => {
                if (block._type === 'block' && block.children) {
                    block.children.forEach(child => {
                        if ('text' in child) {
                            textContent += child.text + ' ';
                        }
                    });
                }
            });

            const wpm = 200; // Average words per minute
            const words = textContent.trim().split(/\s+/).length;
            const timeInMinutes = Math.ceil(words / wpm);

            setReadingTime(Math.max(1, timeInMinutes)); // Ensure at least 1 minute
        };

        calculateReadingTime();
    }, [content]);

    return (
        <span className="flex items-center text-sm text-gray-600 mt-7">
            <Clock className="w-4 h-4 mr-1" /> {readingTime} min read
        </span>
    );
}

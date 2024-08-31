"use client";

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface Block {
    _type: string;
    children?: { _type: string; text: string }[];
}

interface ReadingTimeProps {
    content: Block[];
}

export default function ReadingTime({ content }: ReadingTimeProps) {
    const [readingTime, setReadingTime] = useState<number>(1);

    useEffect(() => {
        const calculateReadingTime = () => {
            let textContent = '';

            content.forEach(block => {
                if (block._type === 'block' && block.children) {
                    block.children.forEach(child => {
                        if (child._type === 'span' && child.text) {
                            textContent += ` ${child.text}`;
                        }
                    });
                }
            });

            const wpm = 200; // Average words per minute reading speed
            const wordsArray = textContent.trim().match(/\w+/g); // Match all words
            const words = wordsArray ? wordsArray.length : 0; // Count words

            const timeInMinutes = words / wpm;
            const roundedTime = Math.ceil(timeInMinutes); // Round up to nearest minute

            console.log('Total Word Count:', words); // Debugging: check the word count
            console.log('Calculated Reading Time (Minutes):', roundedTime); // Debugging: check the calculated time

            setReadingTime(Math.max(1, roundedTime)); // Ensure at least 1 minute
        };

        if (content && content.length > 0) {
            calculateReadingTime();
        }
    }, [content]);

    return (
        <span className="flex items-center text-sm text-gray-600 mt-7">
            <Clock className="w-4 h-4 mr-1" /> {readingTime} min read
        </span>
    );
}

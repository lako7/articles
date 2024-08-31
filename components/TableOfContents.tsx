"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/app/lib/interface';

interface TableOfContentsProps {
    sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        if (!sections || sections.length === 0) {
            console.log('Table of Contents: No sections available');
            return;
        }

        console.log('Table of Contents Sections:', sections);

        const handleScroll = () => {
            let currentActiveSection = '';
            sections.forEach(section => {
                const sectionElement = document.getElementById(section.id);
                if (sectionElement) {
                    const sectionTop = sectionElement.offsetTop;
                    const sectionHeight = sectionElement.clientHeight;
                    if (
                        window.pageYOffset >= sectionTop - 100 &&
                        window.pageYOffset < sectionTop + sectionHeight - 100
                    ) {
                        currentActiveSection = section.id;
                    }
                }
            });
            setActiveSection(currentActiveSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    if (!sections || sections.length === 0) {
        return <p>No sections available.</p>;
    }

    return (
        <nav className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Table of Contents</h2>
            <ul className="space-y-2">
                {sections.map((item, index) => (
                    <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <a
                            href={`#${item.id}`}
                            className={`block py-1 px-2 rounded transition-colors duration-200 ${
                                activeSection === item.id
                                    ? 'bg-emerald-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {item.title}
                        </a>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
}

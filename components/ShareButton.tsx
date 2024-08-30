// components/ShareButtons.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import Toast from './Toast';  // Import the custom Toast component

type SharePlatform = 'facebook' | 'twitter' | 'linkedin';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [shareUrl, setShareUrl] = useState('');
    const [shareTitle, setShareTitle] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);  // State to control the toast message

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(encodeURIComponent(window.location.href));
            setShareTitle(encodeURIComponent(title));
        }
    }, [title]);

    const shareLinks: Record<SharePlatform, string> = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`,
    };

    const handleShare = (platform: SharePlatform) => {
        if (typeof window !== 'undefined') {
            window.open(shareLinks[platform], '_blank', 'width=600,height=400');
            setToastMessage(`Link shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
        }
    };

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    setToastMessage('Link copied to clipboard!');
                })
                .catch((err) => {
                    setToastMessage('Failed to copy link');
                    console.error('Failed to copy link: ', err);
                });
        }
    };

    return (
        <div className="flex space-x-2 mt-7">
            {toastMessage && <Toast message={toastMessage} />}  {/* Render the Toast component */}
            <motion.button
                onClick={() => handleShare('facebook')}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Facebook className="w-4 h-4" />
            </motion.button>
            <motion.button
                onClick={() => handleShare('twitter')}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Twitter className="w-4 h-4" />
            </motion.button>
            <motion.button
                onClick={() => handleShare('linkedin')}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Linkedin className="w-4 h-4" />
            </motion.button>
            <motion.button
                onClick={handleCopyLink}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link2 className="w-4 h-4" />
            </motion.button>
        </div>
    );
}

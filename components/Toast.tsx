// components/Toast.tsx
import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    duration?: number;
}

export default function Toast({ message, duration = 3000 }: ToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-black text-white p-3 rounded">
            {message}
        </div>
    );
}

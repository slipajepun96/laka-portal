import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const removeStart = router.on('start', () => setLoading(true));
        const removeFinish = router.on('finish', () => setLoading(false));

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center  backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
            <p className="mt-4 text-sm text-gray-500 tracking-wide">Loading...</p>
        </div>
    );
}

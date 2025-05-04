import { useEffect, useRef } from 'react';

const useInfiniteScroll = (loadMore, hasMore, isLoading) => {
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current)
            observer.observe(loaderRef.current);

        return () => observer.disconnect();

    }, [hasMore, isLoading]);

    return loaderRef;
};

export default useInfiniteScroll;
import { useState, useEffect, useCallback } from 'react';

export const useResize = (borderWidth = 50) => {
    const [width, setWidth] = useState(window.innerWidth - borderWidth);

    const resizeListener = useCallback(() =>
        setWidth(window.innerWidth - borderWidth), [borderWidth])

    useEffect(() => {
        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        }
    }, [borderWidth, resizeListener]);

    return [width];
}

const calculateWidth = x => (window.innerWidth * x) / 100


export const useResizePercent = (percent = 50) => {

    const [width, setWidth] = useState(calculateWidth(percent));

    const resizeListener = useCallback(() =>
        setWidth(calculateWidth(percent)), [percent])

    useEffect(() => {
        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        }
    }, [percent, resizeListener]);

    return [width];
}

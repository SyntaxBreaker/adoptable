import { useState, useEffect } from 'react';

export default function useClickOutsideElement(elementRef: React.RefObject<HTMLElement>, buttonRef: React.RefObject<HTMLElement>, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    useEffect(() => {
        function handleClickOutsideElement(event: MouseEvent) {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node) && elementRef.current && !elementRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutsideElement);

        return () => {
            document.removeEventListener("click", handleClickOutsideElement);
        }
    }, [elementRef])
}
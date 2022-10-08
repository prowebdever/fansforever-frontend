import { useEffect, RefObject } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement> | undefined | null,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;

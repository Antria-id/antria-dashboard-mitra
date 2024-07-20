import React, { useEffect, useRef } from 'react';
import './AnimatedCursor.css';

const AnimatedCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      const cursor = cursorRef.current;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return <div ref={cursorRef} className="animated-cursor" />;
};

export default AnimatedCursor;

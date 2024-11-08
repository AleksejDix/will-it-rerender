import { useEffect, useRef } from 'react';
import { renderCounter } from '../../stores/renderCounter';

export function useFlashOnRender() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderCounter.incrementReact();
    const element = ref.current;
    if (element) {
      element.style.outline = '2px solid #00ff00';
      element.style.outlineOffset = '-2px';
      element.style.transition = 'outline-color 0.1s ease-in-out';

      const timer = setTimeout(() => {
        element.style.outlineColor = 'transparent';
      }, 100);

      return () => clearTimeout(timer);
    }
  });

  return ref;
}

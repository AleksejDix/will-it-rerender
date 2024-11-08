import { onUpdated, ref } from 'vue';
import { renderCounter } from '../../stores/renderCounter';

export function useFlashOnRender() {
  const elementRef = ref<HTMLElement | null>(null);

  onUpdated(() => {
    renderCounter.incrementVue();
    const element = elementRef.value;
    if (element) {
      element.style.outline = '2px solid #00ff00';
      element.style.outlineOffset = '-2px';
      element.style.transition = 'outline-color 0.1s ease-in-out';

      setTimeout(() => {
        element.style.outlineColor = 'transparent';
      }, 100);
    }
  });

  return elementRef;
}

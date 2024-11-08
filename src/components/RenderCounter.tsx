import { useEffect, useState } from 'react';
import { renderCounter } from '../stores/renderCounter';

export default function RenderCounter() {
  const [counts, setCounts] = useState({
    react: 0,
    vue: 0,
    svelte: 0,
    angular: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts({
        react: renderCounter.getReactCount(),
        vue: renderCounter.getVueCount(),
        svelte: renderCounter.getSvelteCount(),
        angular: renderCounter.getAngularCount(),
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="render-counter">
      <div>
        React Renders: <span className="count react">{counts.react}</span>
      </div>
      <div>
        Vue Renders: <span className="count vue">{counts.vue}</span>
      </div>
      <div>
        Svelte Renders: <span className="count svelte">{counts.svelte}</span>
      </div>
    </div>
  );
}

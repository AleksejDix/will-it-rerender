// Shared render counter store
let reactRenderCount = 0;
let vueRenderCount = 0;
let svelteRenderCount = 0;
let angularRenderCount = 0;

export const renderCounter = {
  incrementReact: () => ++reactRenderCount,
  incrementVue: () => ++vueRenderCount,
  incrementSvelte: () => ++svelteRenderCount,
  incrementAngular: () => ++angularRenderCount,
  getReactCount: () => reactRenderCount,
  getVueCount: () => vueRenderCount,
  getSvelteCount: () => svelteRenderCount,
  getAngularCount: () => angularRenderCount
};
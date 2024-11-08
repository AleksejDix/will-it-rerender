<script lang="ts">
  import { onMount } from 'svelte';
  import { renderCounter } from '../../stores/renderCounter';
  import type { Todo } from '../../types';

  export let todo: Todo;
  export let onToggle: (id: number) => void;
  export let onDelete: (id: number) => void;

  let element: HTMLDivElement;

  function flash() {
    renderCounter.incrementSvelte();
    element.style.outline = '2px solid #00ff00';
    element.style.outlineOffset = '-2px';
    element.style.transition = 'outline-color 0.1s ease-in-out';
    
    setTimeout(() => {
      element.style.outlineColor = 'transparent';
    }, 100);
  }

	onMount(() => {
    flash();
  });
</script>

<div bind:this={element} class="todo-item" on:update={flash}>
  <input
    type="checkbox"
    checked={todo.completed}
    on:change={() => onToggle(todo.id)}
  />
  <span style="text-decoration: {todo.completed ? 'line-through' : 'none'}">
    {todo.text}
  </span>
  <button on:click={() => onDelete(todo.id)}>Delete</button>
</div>
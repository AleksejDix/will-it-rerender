<script lang="ts">
  import { onMount } from 'svelte';
  import TodoItem from './TodoItem.svelte';
  import { renderCounter } from '../../stores/renderCounter';
  import type { Todo } from '../../types';

  let todos: Todo[] = [];
  let input = '';
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

  function addTodo(e: SubmitEvent) {
    e.preventDefault();
    if (input.trim()) {
      todos = [...todos, { id: Date.now(), text: input.trim(), completed: false }];
      input = '';
    }
  }

  function toggleTodo(id: number) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function deleteTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
  }

  $: completedCount = todos.filter(t => t.completed).length;

  onMount(() => {
    flash();
  });
</script>

<div bind:this={element} class="todo-container" on:update={flash}>
  <h2>Svelte Todo App</h2>
  <form on:submit={addTodo} class="todo-form">
    <input
      type="text"
      bind:value={input}
      placeholder="Add a new todo"
    />
    <button type="submit">Add</button>
  </form>
  <div class="todo-list">
    {#each todos as todo (todo.id)}
      <TodoItem
        {todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    {/each}
  </div>
  <div class="todo-stats">
    <p>Total: {todos.length} | Completed: {completedCount}</p>
  </div>
</div>
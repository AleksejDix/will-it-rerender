<script setup lang="ts">
import { ref } from 'vue';
import TodoItem from './TodoItemVue.vue';
import { useFlashOnRender } from './useFlashOnRender';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);
const input = ref('');
const flashRef = useFlashOnRender();

const addTodo = (e: Event) => {
  e.preventDefault();
  if (input.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: input.value.trim(),
      completed: false,
    });
    input.value = '';
  }
};

const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const completedCount = () => todos.value.filter((t) => t.completed).length;
</script>

<template>
  <div ref="flashRef" class="vue-container">
    <h2>Vue Todo App</h2>
    <form @submit="addTodo" class="todo-form">
      <input type="text" v-model="input" placeholder="Add a new todo" />
      <button type="submit">Add</button>
    </form>
    <div class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :completed="todo.completed"
        :onToggle="toggleTodo"
        :onDelete="deleteTodo"
      />
    </div>
    <div class="todo-stats">
      <p>Total: {{ todos.length }} | Completed: {{ completedCount() }}</p>
    </div>
  </div>
</template>

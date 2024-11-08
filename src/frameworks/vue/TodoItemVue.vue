<script setup lang="ts">
import { useFlashOnRender } from './useFlashOnRender';

defineProps<{
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}>();

const flashRef = useFlashOnRender();
</script>

<template>
  <div ref="flashRef" class="todo-item">
    <input
      type="checkbox"
      :checked="completed"
      @change="() => onToggle(id)"
    />
    <span :style="{ textDecoration: completed ? 'line-through' : 'none' }">
      {{ text }}
    </span>
    <button @click="() => onDelete(id)">Delete</button>
  </div>
</template>
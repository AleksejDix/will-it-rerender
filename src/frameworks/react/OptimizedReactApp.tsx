import { useState, useCallback, useMemo } from 'react';
import OptimizedTodoItem from './OptimizedTodoItem';
import { useFlashOnRender } from './useFlashOnRender';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function OptimizedReactApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const flashRef = useFlashOnRender();

  const addTodo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        setTodos((prev) => [
          ...prev,
          { id: Date.now(), text: input.trim(), completed: false },
        ]);
        setInput('');
      }
    },
    [input]
  );

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return (
    <div ref={flashRef} className="react-container">
      <h2>Optimized React Todo App</h2>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <OptimizedTodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
      <div className="todo-stats">
        <p>
          Total: {stats.total} | Completed: {stats.completed}
        </p>
      </div>
    </div>
  );
}

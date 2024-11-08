import { useState } from 'react';
import TodoItem from './TodoItem';
import { useFlashOnRender } from './useFlashOnRender';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function ReactApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const flashRef = useFlashOnRender();

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div ref={flashRef} className="react-container">
      <h2>React Todo App</h2>
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
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
      <div className="todo-stats">
        <p>
          Total: {todos.length} | Completed:{' '}
          {todos.filter((t) => t.completed).length}
        </p>
      </div>
    </div>
  );
}

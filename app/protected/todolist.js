'use client';

import TodoCard from './todocard';

export default function TodoList({ listOfTodos, onTodoSelect, onToggleComplete }) {
    return (
        <div>
            {listOfTodos.map((todo) => (
                <TodoCard 
                    key={todo.id} 
                    todoObj={todo} 
                    onSelect={onTodoSelect} 
                    onToggleComplete={onToggleComplete} 
                />
            ))}
        </div>
    );
}

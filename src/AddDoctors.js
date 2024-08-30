import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const addTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className='bg-blue-200'>
        <div className="p-6 max-w-lg mx-auto bg-blue-200 rounded-lg shadow-md">
        <h1 className="relative text-center text-4xl font-bold mb-4 text-gray-800">
    <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-30 blur-md -z-10"></span>
    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        AddDoctors
    </span>
    <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-300 transform rotate-2 opacity-20">
        AddDoctors
    </span>
</h1>

            {/* <h1 className="text-2xl font-bold mb-4">AddDoctors</h1> */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4"
                    placeholder="Add a new task..."
                />
                <button
                    onClick={addTask}
                    className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
            <ul className="list-disc pl-5">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`flex items-center justify-between mb-2 py-2 px-4 rounded-lg border ${task.completed ? 'bg-green-100' : 'bg-gray-100'} transition-colors`}
                    >
                        <span
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                        >
                            {task.text}
                        </span>
                        <button
                            onClick={() => removeTask(task.id)}
                            className="bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default TodoList;

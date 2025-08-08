import React from "react";

const TaskForm = ({ newTask, setNewTask, handleAddTask, loading }) => {
  return (
    <form
      onSubmit={handleAddTask}
      className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-6"
    >
      <input
        type="text"
        name="title"
        className="col-span-1 sm:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask((t) => ({ ...t, title: e.target.value }))}
        disabled={loading}
        required
      />
      <input
        type="text"
        name="description"
        className="col-span-1 sm:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask((t) => ({ ...t, description: e.target.value }))
        }
        disabled={loading}
      />
      <button
        type="submit"
        className="col-span-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        disabled={loading}
      >
        Add
      </button>
      <select
        name="status"
        type="text"
        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hidden"
        value={newTask.status}
        onChange={(e) => setNewTask((t) => ({ ...t, status: e.target.value }))}
        disabled={loading}
      >
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
      </select>
    </form>
  );
};

export default TaskForm;

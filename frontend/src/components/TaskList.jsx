import React from "react";

const TaskList = ({
  tasks,
  loading,
  error,
  editTaskId,
  editTask,
  handleEditClick,
  handleEditChange,
  handleEditSave,
  handleEditCancel,
  handleDeleteTask,
}) => {
  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;

  if (error)
    return <div className="text-red-500 text-center mb-4">{error}</div>;

  if (tasks.length === 0)
    return <div className="text-gray-400 text-center">No tasks yet.</div>;

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
        >
          {editTaskId === task.id ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="text"
                name="title"
                className="px-2 py-1 border border-gray-300 rounded-lg flex-1"
                value={editTask.title}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="description"
                className="px-2 py-1 border border-gray-300 rounded-lg flex-1"
                value={editTask.description}
                onChange={handleEditChange}
              />
              <select
                name="status"
                className="px-2 py-1 border border-gray-300 rounded-lg"
                value={editTask.status}
                onChange={handleEditChange}
              >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => handleEditSave(task.id)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded transition"
                disabled={loading}
              >
                Save
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-3 py-1 rounded transition"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full items-start sm:items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  {task.title}
                  <span
                    className={`inline-block ml-2 mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      task.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <div className="text-gray-500 text-sm">{task.description}</div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded transition"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded transition"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { fetchWithAuth } from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Homepage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch tasks on mount and when filter/sort changes
  useEffect(() => {
    getTasks();
  }, [filterStatus, sortOrder]);

  const getTasks = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "/api/tasks";
      const params = [];
      if (filterStatus) params.push(`status=${filterStatus}`);
      if (sortOrder) params.push(`sort=${sortOrder}`);
      if (params.length) url += `?${params.join("&")}`;
      const res = await fetchWithAuth(url);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithAuth("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to add task");
      setNewTask({ title: "", description: "", status: "Pending" });
      getTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithAuth(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      getTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithAuth(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(editTask),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setEditTaskId(null);
      getTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditTaskId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Header />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Your Tasks
        </h1>
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 justify-between">
          <div></div>
          <div className="flex gap-2 flex-end">
            <label className="text-gray-600 font-medium content-center">
              Sort:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={loading}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              disabled={loading}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        {/* Add Task Form */}
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          loading={loading}
        />

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            editTaskId={editTaskId}
            editTask={editTask}
            handleEditClick={handleEditClick}
            handleEditChange={handleEditChange}
            handleEditSave={handleEditSave}
            handleEditCancel={handleEditCancel}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default Homepage;
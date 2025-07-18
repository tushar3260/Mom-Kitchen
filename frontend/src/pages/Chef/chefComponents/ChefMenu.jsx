import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useChef } from '../Context/ChefContext';

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const allSlots = ['Breakfast', 'Lunch', 'Dinner'];

const ChefMeals = () => {
  const { chef } = useChef();
  const chefId = chef?._id;

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);        // 🔄 loading
  const [error, setError] = useState(null);             // ❌ error

  const [formData, setFormData] = useState({
    chefId: '',
    title: '',
    description: '',
    price: '',
    photo: '',
    availableDays: [],
    timeSlots: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🔐 Safe checkbox updater
  const handleCheckbox = (name, value, checked) => {
    setFormData(prev => {
      const prevArr = prev[name] ?? [];
      let nextArr;
      if (checked) {
        nextArr = prevArr.includes(value) ? prevArr : [...prevArr, value];
      } else {
        nextArr = prevArr.filter(v => v !== value);
      }
      return { ...prev, [name]: nextArr };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'availableDays' || name === 'timeSlots') {
      handleCheckbox(name, value, checked);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const clearForm = () => {
    setFormData({
      chefId: chef?._id || '',
      title: '',
      description: '',
      price: '',
      photo: '',
      availableDays: [],
      timeSlots: [],
    });
    setEditId(null);
  };

  const closeForm = () => {
    clearForm();
    setShowForm(false);
  };

  const fetchMeals = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/chef/${id}`);
      const data = Array.isArray(res.data) ? res.data : res.data?.meals;
      setMeals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchMeals error', err);
      setError(err?.response?.data?.message || 'Failed to fetch meals');
      toast.error(err?.response?.data?.message || 'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chefId) {
      setFormData(prev => ({ ...prev, chefId }));
      fetchMeals(chefId);
    }
  }, [chefId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, photo, availableDays, timeSlots, chefId } = formData;

    if (![title, description, price, photo].every(Boolean) || !availableDays.length || !timeSlots.length) {
      return toast.error('Please fill all required fields!');
    }
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return toast.error('Price must be a positive number');
    }

    const payload = {
      chefId,
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      photo: photo.trim(),
      availableDays,
      timeSlots,
    };

    try {
      if (editId) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/meals/${editId}`, payload);
        const updated = res.data?.meal || res.data;
        setMeals(prev => prev.map(m => (m._id === editId ? updated : m)));
        toast.success('Meal updated!');
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/meals/create`, payload);
        const created = res.data?.meal || res.data;
        setMeals(prev => [created, ...prev]);
        toast.success('Meal created!');
      }
      clearForm();
    } catch (err) {
      console.error('handleSubmit error', err);
      toast.error(err?.response?.data?.message || 'Error submitting meal!');
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      chefId: meal.chefId?._id || meal.chefId,
      title: meal.title ?? '',
      description: meal.description ?? '',
      price: meal.price ?? '',
      photo: meal.photo ?? '',
      availableDays: meal.availableDays ?? [],
      timeSlots: meal.timeSlots ?? [],
    });
    setEditId(meal._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this meal?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      setMeals(prev => prev.filter(m => m._id !== id));
      toast.success('Meal deleted!');
    } catch (err) {
      console.error('handleDelete error', err);
      toast.error(err?.response?.data?.message || 'Failed to delete meal');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">👨‍🍳 All Meals</h1>

      <button
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={() => (showForm ? closeForm() : setShowForm(true))}
        type="button"
      >
        {showForm ? 'Hide Form' : 'Add New Meal'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-orange-50 p-6 rounded shadow space-y-4 mb-10">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Meal Title"
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-3 py-2 border rounded"
            min="0"
          />
          <input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="w-full px-3 py-2 border rounded"
          />
          {formData.photo && (
            <img
              src={formData.photo}
              alt="preview"
              className="h-40 w-auto rounded border"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
            />
          )}

          {/* Days */}
          <fieldset className="flex flex-wrap gap-3">
            <legend className="text-sm font-medium text-gray-700 mb-1">Available Days</legend>
            {allDays.map((day) => {
              const id = `day-${day}`;
              return (
                <label key={day} htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    id={id}
                    type="checkbox"
                    name="availableDays"
                    value={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={handleChange}
                  />
                  {day}
                </label>
              );
            })}
          </fieldset>

          {/* Time Slots */}
          <fieldset className="flex flex-wrap gap-3">
            <legend className="text-sm font-medium text-gray-700 mb-1">Time Slots</legend>
            {allSlots.map((slot) => {
              const id = `slot-${slot}`;
              return (
                <label key={slot} htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    id={id}
                    type="checkbox"
                    name="timeSlots"
                    value={slot}
                    checked={formData.timeSlots.includes(slot)}
                    onChange={handleChange}
                  />
                  {slot}
                </label>
              );
            })}
          </fieldset>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
            >
              {editId ? 'Update Meal' : 'Add Meal'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded hover:bg-orange-100"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {/* Loading / Error / Empty */}
      {loading && <p className="text-gray-500">Loading meals...</p>}
      {!loading && error && (
        <p className="text-red-600">{error}</p>
      )}
      {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500">No meals yet. Click “Add New Meal” to create one.</p>
      )}

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="bg-white shadow rounded overflow-hidden">
            <img
              src={meal.photo}
              alt={meal.title}
              className="h-40 w-full object-cover"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x160?text=Image+Missing'; }}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{meal.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
              <p className="text-sm mt-1 font-medium">₹{meal.price}</p>
              <p className="text-xs text-gray-500">Days: {meal.availableDays?.join(', ')}</p>
              <p className="text-xs text-gray-500">Time: {meal.timeSlots?.join(', ')}</p>
              <div className="mt-3 flex justify-between text-sm">
                <button
                  onClick={() => handleEdit(meal)}
                  className="text-yellow-600 hover:underline"
                  type="button"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="text-red-600 hover:underline"
                  type="button"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ChefMeals;

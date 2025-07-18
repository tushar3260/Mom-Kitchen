import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useChef } from '../Context/ChefContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlusCircle, FaTimes, FaTrash, FaEdit } from 'react-icons/fa';

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const allSlots = ['Breakfast', 'Lunch', 'Dinner'];

const ChefMeals = () => {
  const { chef } = useChef();
  const chefId = chef?._id;

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // ✅ Checkbox Handler
  const handleCheckbox = (name, value, checked) => {
    setFormData(prev => {
      const prevArr = prev[name] ?? [];
      const nextArr = checked
        ? [...prevArr, value]
        : prevArr.filter(v => v !== value);
      return { ...prev, [name]: nextArr };
    });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
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

  // ✅ Normalize data after fetch
  const normalizeMeals = (data) => {
    return data.map(m => ({
      ...m,
      availableDays: Array.isArray(m.availableDays)
        ? m.availableDays
        : typeof m.availableDays === 'string'
          ? m.availableDays.split(',').map(x => x.trim()).filter(Boolean)
          : [],
      timeSlots: Array.isArray(m.timeSlots)
        ? m.timeSlots
        : typeof m.timeSlots === 'string'
          ? m.timeSlots.split(',').map(x => x.trim()).filter(Boolean)
          : [],
      photo: m.photo || '',
    }));
  };

  // ✅ Fetch Meals
  const fetchMeals = async (id) => {
    if (!id) {
      console.warn("❌ No chefId for fetching meals");
      return;
    }
    console.log("✅ Fetching meals for chefId:", id);
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/chef/${id}`);
      console.log("✅ API Response:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.meals || [];

      setMeals(normalizeMeals(data));
    } catch (err) {
      console.error('❌ Error fetching meals:', err);
      setError('Failed to fetch meals');
      toast.error('Failed to fetch meals');
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
      return toast.error('Please fill all fields!');
    }

    const payload = {
      chefId,
      title,
      description,
      price: Number(price),
      photo,
      availableDays: Array.from(new Set(availableDays)),
      timeSlots: Array.from(new Set(timeSlots)),
    };

    try {
      if (editId) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/meals/${editId}`, payload);
        setMeals(prev => prev.map(m => (m._id === editId ? res.data : m)));
        toast.success('Meal updated!');
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/meals/create`, payload);
        setMeals(prev => [res.data, ...prev]);
        toast.success('Meal added!');
      }
      clearForm();
      setShowForm(false);
    } catch (err) {
      toast.error('Error submitting meal!');
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      chefId: meal.chefId?._id || meal.chefId || '',
      title: meal.title || '',
      description: meal.description || '',
      price: meal.price || '',
      photo: meal.photo || '',
      availableDays: Array.isArray(meal.availableDays) ? meal.availableDays : [],
      timeSlots: Array.isArray(meal.timeSlots) ? meal.timeSlots : [],
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
      toast.error('Failed to delete meal');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          🍽️ Manage Your Meals
        </h1>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <FaTimes /> : <FaPlusCircle />} {showForm ? 'Close' : 'Add New Meal'}
        </button>
      </div>

      {/* Animated Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-orange-200 mb-10 space-y-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Meal Title" className="w-full px-3 py-2 border rounded" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full px-3 py-2 border rounded" />
            <input type="url" name="photo" value={formData.photo} onChange={handleChange} placeholder="Photo URL" className="w-full px-3 py-2 border rounded" />

            {formData.photo && <img src={formData.photo} alt="Preview" className="h-32 w-auto rounded shadow" />}

            {/* Days */}
            <div className="flex flex-wrap gap-3">
              {allDays.map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input type="checkbox" name="availableDays" value={day} checked={formData.availableDays.includes(day)} onChange={handleChange} />
                  {day}
                </label>
              ))}
            </div>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-3">
              {allSlots.map((slot) => (
                <label key={slot} className="flex items-center gap-2">
                  <input type="checkbox" name="timeSlots" value={slot} checked={formData.timeSlots.includes(slot)} onChange={handleChange} />
                  {slot}
                </label>
              ))}
            </div>

            <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
              {editId ? 'Update Meal' : 'Add Meal'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill().map((_, i) => (
            <div key={i} className="h-60 bg-gray-200 animate-pulse rounded-lg"></div>
          ))
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : meals.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">🚫 No meals found. Add some!</div>
        ) : (
          meals.map((meal) => (
            <motion.div
              key={meal._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition hover:scale-[1.02]"
              whileHover={{ scale: 1.02 }}
            >
              <img src={meal.photo} alt={meal.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{meal.title}</h2>
                <p className="text-gray-600 line-clamp-2">{meal.description}</p>
                <p className="font-semibold text-orange-600 mt-2">₹{meal.price}</p>
                <p className="text-xs text-gray-500">
                  Days: {meal.availableDays?.length ? meal.availableDays.join(', ') : '—'}
                </p>
                <p className="text-xs text-gray-500">
                  Time: {meal.timeSlots?.length ? meal.timeSlots.join(', ') : '—'}
                </p>
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleEdit(meal)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(meal._id)} className="text-red-600 hover:text-red-800 flex items-center gap-1"><FaTrash /> Delete</button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChefMeals;

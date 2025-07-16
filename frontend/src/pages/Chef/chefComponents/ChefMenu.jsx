import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useChef } from '../Context/ChefContext';

const ChefMeals = () => {
  const { chef } = useChef();
  const [meals, setMeals] = useState([]);
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

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const allSlots = ['Breakfast', 'Lunch', 'Dinner'];

  // ✅ Load all meals (no filter)
  const fetchMeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      setMeals(res.data); // ✅ Show all meals
    } catch (err) {
      toast.error('Failed to fetch meals');
    }
  };

  useEffect(() => {
    if (chef?._id) {
      setFormData((prev) => ({ ...prev, chefId: chef._id }));
      fetchMeals();
    }
  }, [chef]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'availableDays' || name === 'timeSlots') {
      const updatedList = [...formData[name]];
      if (checked) updatedList.push(value);
      else updatedList.splice(updatedList.indexOf(value), 1);
      setFormData({ ...formData, [name]: updatedList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      chefId: chef._id || '',
      title: '',
      description: '',
      price: '',
      photo: '',
      availableDays: [],
      timeSlots: [],
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, photo, availableDays, timeSlots } = formData;
    if (!title || !description || !price || !photo || !availableDays.length || !timeSlots.length) {
      return toast.error('Please fill all required fields!');
    }

    try {
      if (editId) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/meals/${editId}`, formData);
        setMeals((prev) => prev.map((m) => (m._id === editId ? res.data.meal : m)));
        toast.success('Meal updated!');
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/meals/create`, formData);
        setMeals((prev) => [res.data.meal, ...prev]);
        toast.success('Meal created!');
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Error submitting meal!');
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      chefId: meal.chefId._id || meal.chefId,
      title: meal.title,
      description: meal.description,
      price: meal.price,
      photo: meal.photo,
      availableDays: meal.availableDays,
      timeSlots: meal.timeSlots,
    });
    setEditId(meal._id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure to delete?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/meals/${id}`);
      setMeals((prev) => prev.filter((m) => m._id !== id));
      toast.success('Meal deleted!');
    } catch (err) {
      toast.error('Failed to delete meal');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">👨‍🍳 All Meals</h1>

      <button
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={() => setShowForm(!showForm)}
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
            <img src={formData.photo} alt="preview" className="h-40 w-auto rounded border" />
          )}

          <div className="flex flex-wrap gap-3">
            {allDays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day}
                  checked={formData.availableDays.includes(day)}
                  onChange={handleChange}
                />
                {day}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {allSlots.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="timeSlots"
                  value={slot}
                  checked={formData.timeSlots.includes(slot)}
                  onChange={handleChange}
                />
                {slot}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
          >
            {editId ? 'Update Meal' : 'Add Meal'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="bg-white shadow rounded overflow-hidden">
            <img src={meal.photo} alt={meal.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{meal.title}</h2>
              <p className="text-sm text-gray-600">{meal.description}</p>
              <p className="text-sm mt-1">₹{meal.price}</p>
              <p className="text-xs text-gray-500">Days: {meal.availableDays.join(', ')}</p>
              <p className="text-xs text-gray-500">Time: {meal.timeSlots.join(', ')}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => handleEdit(meal)}
                  className="text-yellow-600 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="text-red-600 text-sm"
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

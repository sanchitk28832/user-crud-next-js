"use client";
import { useEffect } from 'react';
import { User } from '@/models/User';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateUsername,
  validatePassword,
} from '@/form-validations/AddUserValidations';
import { useUpdateUserStore } from '@/stores/updateUserStore';

interface UserUpdateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: User;
}

const UserUpdateModal = ({ isOpen, closeModal, user }: UserUpdateModalProps) => {
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isSubmitting,
    setIsSubmitting,
    updateUser,
    error,
    setError,
  } = useUpdateUserStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
    formErrors: state.formErrors,
    setFormErrors: state.setFormErrors,
    isSubmitting: state.isSubmitting,
    setIsSubmitting: state.setIsSubmitting,
    updateUser: state.updateUser,
    error: state.error,
    setError: state.setError,
  }));

  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      username: user.username || '',
      password: user.password || '',
    });
  }, [user, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'firstName':
        setFormErrors({ ...formErrors, firstName: validateFirstName(value) });
        break;
      case 'lastName':
        setFormErrors({ ...formErrors, lastName: validateLastName(value) });
        break;
      case 'email':
        setFormErrors({ ...formErrors, email: validateEmail(value) });
        break;
      case 'phone':
        setFormErrors({ ...formErrors, phone: validatePhone(value) });
        break;
      case 'username':
        setFormErrors({ ...formErrors, username: validateUsername(value) });
        break;
      case 'password':
        setFormErrors({ ...formErrors, password: validatePassword(value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalErrors = {
      firstName: validateFirstName(formData.firstName || ''),
      lastName: validateLastName(formData.lastName || ''),
      email: validateEmail(formData.email || ''),
      phone: validatePhone(formData.phone || ''),
      username: validateUsername(formData.username || ''),
      password: validatePassword(formData.password || ''),
    };

    setFormErrors(finalErrors);

    const hasErrors = Object.values(finalErrors).some((error) => error !== '');
    if (hasErrors) return;

    setIsSubmitting(true);

    try {
      await updateUser(user.id, formData);
      console.log("User Updated: ", formData)
      alert("User Updated Successfully...");
      closeModal();
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error, setError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mb-4">
              <label className="block text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter first name"
              />
              {formErrors.firstName && <p className="text-red-400 mt-1">{formErrors.firstName}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter last name"
              />
              {formErrors.lastName && <p className="text-red-400 mt-1">{formErrors.lastName}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter email"
              />
              {formErrors.email && <p className="text-red-400 mt-1">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter phone number"
              />
              {formErrors.phone && <p className="text-red-400 mt-1">{formErrors.phone}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter username"
              />
              {formErrors.username && <p className="text-red-400 mt-1">{formErrors.username}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter password"
              />
              {formErrors.password && <p className="text-red-400 mt-1">{formErrors.password}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="mr-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateModal;

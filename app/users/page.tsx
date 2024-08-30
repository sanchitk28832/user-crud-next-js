"use client"; 
import { useEffect } from 'react';
import Link from 'next/link';
import UserUpdateModal from '@/app/users/edit/[id]/page'; 
import { useUserStore } from '@/stores/userStore';

const UserPage = () => {
  const { users, loading, error, selectedUser, isModalOpen, fetchUsers, handleDeleteUser, handleUpdateClick, closeModal } = useUserStore(state => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
    selectedUser: state.selectedUser,
    isModalOpen: state.isModalOpen,
    fetchUsers: state.fetchUsers,
    handleDeleteUser: state.handleDeleteUser,
    handleUpdateClick: state.handleUpdateClick,
    closeModal: state.closeModal,
  }));

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div key={user.id} className="border-black rounded-lg shadow-lg p-4 bg-gray-900">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold text-white">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-200">{user.email}</p>
          <p className="text-gray-200">Gender: {user.gender}</p>
          <div className="flex justify-end space-x-4 mt-4">
            <Link href={`/users/read/${user.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Read
              </button>
            </Link>
            <button
              onClick={() => handleUpdateClick(user)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Updating User */}
      {selectedUser && (
        <UserUpdateModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserPage;

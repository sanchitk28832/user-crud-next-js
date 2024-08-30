"use client";
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore'; 
import Link from 'next/link';
import UserUpdateModal from '@/app/users/edit/[id]/page'; 
export default function Home() {
  const {
    users,
    loading,
    error,
    selectedUser,
    isModalOpen,
    fetchUsers,
    handleDeleteUser,
    handleUpdateClick,
    closeModal
  } = useUserStore((state) => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
    selectedUser: state.selectedUser,
    isModalOpen: state.isModalOpen,
    fetchUsers: state.fetchUsers,
    handleDeleteUser: state.handleDeleteUser,
    handleUpdateClick: state.handleUpdateClick,
    closeModal: state.closeModal
  }));

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="p-6">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="w-1/6 px-4 py-2 border-b border-gray-700">Profile</th>
              <th className="w-1/6 px-4 py-2 border-b border-gray-700">Name</th>
              <th className="w-1/6 px-4 py-2 border-b border-gray-700">Email</th>
              <th className="w-1/6 px-4 py-2 border-b border-gray-700">Gender</th>
              <th className="w-1/6 px-4 py-2 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center border-b border-gray-700">
                <td className="px-4 py-2">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2">
                    <Link href={`/users/read/${user.id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        Read
                      </button>
                    </Link>
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Updating User */}
        {selectedUser && (
          <UserUpdateModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            user={selectedUser}
          />
        )}
      </div>
    </main>
  );
}

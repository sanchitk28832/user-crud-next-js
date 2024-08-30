"use client"; 
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

const UserDetailPage = () => {
  const { id } = useParams(); 
  const router = useRouter(); 
  const { selectedUser: user, loading, error, fetchUserById } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchUserById(Number(id));
    }
  }, [id, fetchUserById]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl relative">
        <button
          onClick={() => router.back()} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex items-center mb-4">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-black">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">Maiden Name: {user.maidenName}</p>
            <p className="text-gray-600">Birth Date: {user.birthDate}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">Gender: {user.gender}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-black">Biological Information</h3>
          <p className="text-gray-600">Blood Group: {user.bloodGroup}</p>
          <p className="text-gray-600">Height: {user.height} cm</p>
          <p className="text-gray-600">Weight: {user.weight} kg</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;


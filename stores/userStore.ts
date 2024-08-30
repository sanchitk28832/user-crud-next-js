import {create} from 'zustand';
import { User } from '@/models/User';
import { getUsers, getUserById, deleteUser } from '@/services/userService';

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  isModalOpen: boolean;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;  // New method
  handleDeleteUser: (userId: number) => Promise<void>;
  handleUpdateClick: (user: User) => void;
  closeModal: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: true,
  error: null,
  selectedUser: null,
  isModalOpen: false,
  fetchUsers: async () => {
    try {
      const fetchedUsers = await getUsers();
      set({ users: fetchedUsers, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
  fetchUserById: async (id: number) => {  // New method
    set({ loading: true, error: null });
    try {
      const fetchedUser = await getUserById(id);
      set({ selectedUser: fetchedUser, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch user details', loading: false });
    }
  },
  handleDeleteUser: async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        }));
      } catch (error) {
        set({ error: 'Failed to delete user' });
      }
    }
  },
  handleUpdateClick: (user) => {
    set({ selectedUser: user, isModalOpen: true });
  },
  closeModal: () => {
    set({ isModalOpen: false, selectedUser: null });
  },
}));

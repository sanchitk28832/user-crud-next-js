import { create } from 'zustand';
import { User } from '@/models/User';
import { updateUser } from '@/services/userService';

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  formData: Partial<User>;
  setFormData: (data: Partial<User>) => void;
  formErrors: Record<string, string>;
  setFormErrors: (errors: Record<string, string>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  updateUser: (id: number, updatedData: Partial<User>) => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useUpdateUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  formData: {},
  setFormData: (data) => set({ formData: data }),
  formErrors: {},
  setFormErrors: (errors) => set({ formErrors: errors }),
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  updateUser: async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      set((state) => ({
        users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      }));
    } catch (error) {
      set({ error: 'Failed to update user' });
    }
  },
  error: null,
  setError: (error) => set({ error }),
}));

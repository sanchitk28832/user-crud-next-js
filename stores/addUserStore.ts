import { create } from 'zustand';
import { UserData } from '@/models/UserData';

interface AddUserState {
    formData: UserData;
    formErrors: Partial<UserData>;
    success: boolean;
    isSubmitting: boolean;
    setFormData: (field: keyof UserData, value: string | number) => void;
    setFormErrors: (field: keyof UserData, error: string) => void;
    setSuccess: (value: boolean) => void;
    setIsSubmitting: (value: boolean) => void;
    resetForm: () => void;
}

const useAddUserStore = create<AddUserState>((set) => ({
    formData: {
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        bloodGroup: '',
        height: '',
        weight: '',
    },
    formErrors: {},
    success: false,
    isSubmitting: false,
    setFormData: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        })),
    setFormErrors: (field, error) =>
        set((state) => ({
            formErrors: {
                ...state.formErrors,
                [field]: error,
            },
        })),
    setSuccess: (value) => set({ success: value }),
    setIsSubmitting: (value) => set({ isSubmitting: value }),
    resetForm: () =>
        set({
            formData: {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                bloodGroup: '',
                height: '',
                weight: '',
            },
            formErrors: {},
            success: false,
            isSubmitting: false,
        }),
}));

export default useAddUserStore;

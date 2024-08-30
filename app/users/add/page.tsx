"use client"; 
import { useRouter } from 'next/navigation';
import { addUser } from '@/services/userService';
import  useAddUserStore  from '@/stores/addUserStore';
import {
    validateFirstName,
    validateLastName,
    validateGender,
    validateEmail,
    validatePhone,
    validateUsername,
    validatePassword,
    validateHeight,
    validateWeight
} from '@/form-validations/UserValidations';

const AddUserPage = () => {
    const router = useRouter();
    const {
        formData,
        formErrors,
        success,
        isSubmitting,
        setFormData,
        setFormErrors,
        setSuccess,
        setIsSubmitting,
        resetForm
    } = useAddUserStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(name as keyof typeof formData, value);
        validateField(name, value);
    };

    const validateField = (name: string, value: string | number) => {
        let error = '';
        switch (name) {
            case 'firstName':
                error = validateFirstName(value as string);
                break;
            case 'lastName':
                error = validateLastName(value as string);
                break;
            case 'gender':
                error = validateGender(value as string);
                break;
            case 'email':
                error = validateEmail(value as string);
                break;
            case 'phone':
                error = validatePhone(value as string);
                break;
            case 'username':
                error = validateUsername(value as string);
                break;
            case 'password':
                error = validatePassword(value as string);
                break;
            case 'height':
                error = validateHeight(value as string);
                break;
            case 'weight':
                error = validateWeight(value as string);
                break;
            default:
                break;
        }
        setFormErrors(name as keyof typeof formErrors, error);
    };

    const validateForm = () => {
        const errors: Partial<typeof formData> = {};
        errors.firstName = validateFirstName(formData.firstName);
        errors.lastName = validateLastName(formData.lastName);
        errors.gender = validateGender(formData.gender);
        errors.email = validateEmail(formData.email);
        errors.phone = validatePhone(formData.phone);
        errors.username = validateUsername(formData.username);
        errors.password = validatePassword(formData.password);
        errors.height = validateHeight(formData.height);
        errors.weight = validateWeight(formData.weight);
        setFormErrors('firstName', errors.firstName || '');
        setFormErrors('lastName', errors.lastName || '');
        setFormErrors('gender', errors.gender || '');
        setFormErrors('email', errors.email || '');
        setFormErrors('phone', errors.phone || '');
        setFormErrors('username', errors.username || '');
        setFormErrors('password', errors.password || '');
        setFormErrors('height', errors.height || '');
        setFormErrors('weight', errors.weight || '');
        return Object.values(errors).every((error) => error === '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await addUser(formData);
            setSuccess(true);
            console.log("User Added Successfully: ", formData);
            alert("User Added Successfully...");
            resetForm();
            router.push('/users'); // Redirect after success
        } catch (err) {
            alert("Failed to add user");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-60 my-6 p-12 bg-gray-900 border-2 border-gray-700 rounded-3xl text-white">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            {success && <p className="text-green-500">User added successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-400">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        >
                            <option value="" className="text-gray-600">Select Gender</option>
                            <option value="Male" className="text-gray-600">Male</option>
                            <option value="Female" className="text-gray-600">Female</option>
                            <option value="Others" className="text-gray-600">Others</option>
                        </select>
                        {formErrors.gender && <p className="text-red-500">{formErrors.gender}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        />
                        {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                        >
                            <option value="" className="text-gray-600">Select Blood Group</option>
                            <option value="A+" className="text-gray-600">A+</option>
                            <option value="A-" className="text-gray-600">A-</option>
                            <option value="B+" className="text-gray-600">B+</option>
                            <option value="B-" className="text-gray-600">B-</option>
                            <option value="AB+" className="text-gray-600">AB+</option>
                            <option value="AB-" className="text-gray-600">AB-</option>
                            <option value="O+" className="text-gray-600">O+</option>
                            <option value="O-" className="text-gray-600">O-</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                           
                        />
                        {formErrors.height && <p className="text-red-500">{formErrors.height}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="mt-1 p-2 bg-gray-800 border border-gray-600 rounded w-full text-white"
                            
                        />
                        {formErrors.weight && <p className="text-red-500">{formErrors.weight}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
                >
                    {isSubmitting ? 'Adding...' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;

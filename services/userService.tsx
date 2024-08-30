import axios from 'axios';
import { User } from '../models/User';
import { UserData } from '../models/UserData';

const API_URL = 'https://dummyjson.com/users';

export const getUsers = async () => {
    const response = await axios.get<{ users: User[] }>(API_URL);
    return response.data.users;
};

export const getUserById = async (userId: number) => {
    const response = await axios.get<User>(`${API_URL}/${userId}`);
    return response.data;
};


export const deleteUser = async (userId: number) => {
    const response = await axios.delete<User>(`${API_URL}/${userId}`);
    console.log("User Deleted:",response.data);
    return response.data;
};

export const updateUser = async (userId: number, updatedData: Partial<User>) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedData);
    return response.data as User;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};


export const addUser = async (data: UserData): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/add`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || 'Failed to add user');
      }
      throw new Error('An unexpected error occurred');
    }
  };








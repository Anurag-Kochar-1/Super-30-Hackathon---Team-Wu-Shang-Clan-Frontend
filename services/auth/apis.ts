import { api } from "@/lib/axios";
import { User } from "@/types";

export const registerUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return (await api.post("/auth/register", data)).data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ user: User, token: string }> => {
  return (await api.post(`/auth/login`, data)).data;
};

export const getUser = async (): Promise<{ message: string, status: string, data: { user: User } }> => {
  return (await api.get(`/auth/me`)).data;
}
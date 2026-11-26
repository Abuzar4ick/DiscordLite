import { axiosInstance } from "../config/axios";

export interface SignupPayload {
  email: string;
  username: string;
  password: string;
}

export interface SignupResponseData {
  message: string;
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export const signupApi = async (
  payload: SignupPayload,
): Promise<SignupResponseData> => {
  const response = await axiosInstance.post<
    ApiSuccessResponse<SignupResponseData>
  >("/auth/signup", payload);

  return response.data.data;
};

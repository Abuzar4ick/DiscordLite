import axios from "axios";
import { create } from "zustand";
import { signupApi, type SignupPayload } from "../api/auth.api";

interface AuthState {
  isSigningUp: boolean;
  signupSuccessMessage: string | null;
  signupEmail: string | null;
  error: string | null;
  signup: (payload: SignupPayload) => Promise<boolean>;
  clearError: () => void;
  resetSignupState: () => void;
}

interface ApiErrorBody {
  error?: string;
}

const extractErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError<ApiErrorBody | string>(err)) {
    const data = err.response?.data;
    if (typeof data === "string" && data.trim()) {
      return data;
    }
    if (data && typeof data === "object" && typeof data.error === "string") {
      return data.error;
    }
    if (err.message) {
      return err.message;
    }
  }

  if (err instanceof Error && err.message) {
    return err.message;
  }

  return "Something went wrong. Please try again.";
};

export const useAuthStore = create<AuthState>((set) => ({
  isSigningUp: false,
  signupSuccessMessage: null,
  signupEmail: null,
  error: null,

  signup: async (payload: SignupPayload) => {
    set({ isSigningUp: true, error: null, signupSuccessMessage: null });

    try {
      const data = await signupApi(payload);
      set({
        isSigningUp: false,
        signupSuccessMessage: data.message,
        signupEmail: payload.email,
      });
      return true;
    } catch (err) {
      set({
        isSigningUp: false,
        error: extractErrorMessage(err),
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  resetSignupState: () =>
    set({
      error: null,
      signupSuccessMessage: null,
      signupEmail: null,
    }),
}));

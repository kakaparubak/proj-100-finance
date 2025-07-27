"use server";

import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";

export const userLoginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const userLogoutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const userSignupAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("Error signing up. Please try again.");
    }

    // Add user to the database

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

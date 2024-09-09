import { getApiClient } from '../../../api/client';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await getApiClient().post('/auth/login', {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

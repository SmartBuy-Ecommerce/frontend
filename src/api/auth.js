import {apiClient}  from './apiClient'; // 👈 Now using named import

// Test backend connection (no real auth)
export const checkBackendConnection = async () => {
  const response = await apiClient.get('/health');
  return response.data; // { status: "OK" }
};

//  login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });

    const token = response.data.token || response.data;
    localStorage.setItem('authToken', token);

    // Use user payload if backend sent it, otherwise decode token
    let userData = response.data.user || {};

    if (!userData || Object.keys(userData).length === 0) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        userData = JSON.parse(jsonPayload) || {};
      } catch {
        userData = {};
      }
    }

    const rawRole = userData.role
      || (Array.isArray(userData.authorities) ? userData.authorities[0]?.authority : undefined)
      || userData.scope
      || '';

    const normalizedRole = (rawRole || '')
      .toString()
      .toUpperCase()
      .replace(/^ROLE_/, '');

    const normalizedUser = {
      ...userData,
      role: normalizedRole,
      email: userData.email || userData.sub || email,
    };

    return { token, user: normalizedUser };
  } catch (error) {
    // Show specific backend error for invalid credentials
    let errorMsg = 'Login failed: ';
    if (error.response) {
      if (error.response.status === 401) {
        errorMsg += error.response.data || 'Invalid email or password.';
      } else if (error.response.data?.message) {
        errorMsg += error.response.data.message;
      } else {
        errorMsg += error.response.data || error.message;
      }
    } else {
      errorMsg += error.message;
    }
    throw new Error(errorMsg);
  }
}

// User signup
export const signup = async (userData) => {
  try {
    // console.log('Sending signup payload:', userData);
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Full error response:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
};


// Email validation
export const EmailValidation = async (email) => {
  try {
    const response = await apiClient.post('/auth/check-email', { email });
    return response.data; // { isValid: true/false, message: "..." }
  } catch (error) {
    console.error('Email validation error:', error);
    throw error;
  }
};

//logout
export const logout = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
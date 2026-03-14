const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.vercel.app/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    // Ensure we don't use localhost in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      if (this.baseURL.includes('localhost')) {
        console.warn('Using localhost API URL in production. Please set NEXT_PUBLIC_API_URL environment variable.');
      }
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ في الطلب');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async sendOTP(phoneNumber) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    });
  }

  async verifyOTP(phoneNumber, otp, password) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, otp, password }),
    });
  }

  async login(phoneNumber, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Parent endpoints
  async registerParent(formData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/parents/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'حدث خطأ في التسجيل');
    }
    return data;
  }

  async getParentProfile() {
    return this.request('/parents/profile');
  }

  async updateParentProfile(formData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/parents/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'حدث خطأ في التحديث');
    }
    return data;
  }
}

export default new ApiClient();
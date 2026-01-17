// Add this at the top of Api.js
const API_BASE_URL = 'http://localhost:8000';

class HeartDiseaseAPI {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    console.log('🔗 API Base URL:', this.baseURL);
  }

  async _fetch(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    // Add credentials for CORS
    const config = {
      ...options,
      credentials: 'include',  // Important for CORS with credentials
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',  // Explicit CORS mode
    };

    try {
      const response = await fetch(url, config);
      console.log(`✅ API Response: ${response.status} ${response.statusText}`);
      
      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📦 API Data:', data);
      return data;
      
    } catch (error) {
      console.error('🔥 Fetch Error:', error);
      console.error('URL:', url);
      console.error('Config:', config);
      
      // More specific error messages
      if (error.message.includes('Failed to fetch')) {
        throw new Error(`Cannot connect to backend at ${this.baseURL}. Make sure it's running.`);
      }
      if (error.message.includes('NetworkError')) {
        throw new Error('Network error. Check CORS configuration in backend.');
      }
      
      throw error;
    }
  }
  
  // ... rest of your methods remain the same
}
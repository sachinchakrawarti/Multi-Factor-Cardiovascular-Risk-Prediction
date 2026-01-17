import React from 'react'

export default function Test() {
  return (
    // Add this function inside your Test component
const testConnection = async () => {
  console.log('🛠️ Testing API connection...');
  
  try {
    console.log('1. Testing health endpoint...');
    const health = await api.getHealthStatus();
    console.log('✅ Health:', health);
    
    console.log('2. Testing features endpoint...');
    const features = await api.getFeatures();
    console.log('✅ Features:', features);
    
    console.log('3. Testing root endpoint...');
    const root = await api.getRootInfo();
    console.log('✅ Root:', root);
    
    setApiStatus('connected');
    alert('✅ API Connection Successful!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    console.error('Full error:', error);
    
    // Check network tab
    console.log('🔍 Check browser Network tab for failed requests');
    
    setApiStatus('disconnected');
    alert(`❌ API Connection Failed: ${error.message}\n\nCheck console for details.`);
  }
};

// Add this button in the header section
<div className="flex flex-col items-center mt-4 space-y-2">
  <div className="flex items-center">
    <div className={`w-3 h-3 rounded-full mr-2 ${apiStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
    <span className="text-white font-medium">
      API Status: {apiStatus === 'connected' ? 'Connected' : 'Disconnected'}
    </span>
  </div>
  
  <div className="flex space-x-2">
    <button
      onClick={checkApiHealth}
      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Check Health
    </button>
    <button
      onClick={testConnection}
      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      Test Connection
    </button>
    {apiStatus === 'disconnected' && (
      <button 
        onClick={() => window.open('http://localhost:8000/health', '_blank')}
        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Open Backend
      </button>
    )}
  </div>
  )
}

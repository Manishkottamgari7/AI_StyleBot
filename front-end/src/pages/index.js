import React, { useState, useEffect } from 'react';

const ImageAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testHuggingFaceConnection();
  }, []);

  const testHuggingFaceConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/test-hf-connection');
      const data = await response.json();
      setApiStatus(data.message);
    } catch (error) {
      setApiStatus('API connection failed');
      console.error('API connection error:', error);
    }
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      await testImageUpload(file);
    }
  };

  const testImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3001/api/test-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setUploadStatus(data.message);
      
      if (response.ok) {
        await analyzeImage(file);
      }
    } catch (error) {
      setError('Upload test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3001/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      setError('Analysis failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisResult) return null;

    // Extract relevant information from analysis
    const { analysis } = analysisResult;
    
    // Sort and group predictions by confidence score if available
    let sortedPredictions = [];
    if (Array.isArray(analysis)) {
      sortedPredictions = [...analysis].sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Analysis Results</h2>
        
        {/* Display sorted predictions */}
        <div className="space-y-2">
          {sortedPredictions.map((prediction, index) => (
            <div 
              key={index}
              className="p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{prediction.label}</span>
                  {prediction.score && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${prediction.score * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        Confidence: {(prediction.score * 100).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Display raw data for debugging */}
        <div className="mt-4">
          <details className="bg-gray-50 rounded-lg p-2">
            <summary className="cursor-pointer text-sm text-gray-600">
              Raw Analysis Data
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Image Analysis Dashboard</h1>
        
        {/* API Status */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">API Status</h2>
          <div className={`p-3 rounded ${apiStatus?.includes('successful') ? 'bg-green-100' : 'bg-red-100'}`}>
            {apiStatus || 'Checking API connection...'}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Upload Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="mb-4"
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-64 mx-auto rounded"
              />
            )}
          </div>
          {uploadStatus && (
            <div className="mt-2 p-3 bg-blue-100 rounded">
              {uploadStatus}
            </div>
          )}
        </div>

        {/* Analysis Results */}
        {analysisResult && renderAnalysisResults()}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-100 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalyzer;
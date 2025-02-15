import React, { useState } from 'react';

const FileUploadWithNavigation: React.FC = () => {
  // State for file upload and UI navigation
  const [file, setFile] = useState<File | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [currentUI, setCurrentUI] = useState<'upload' | 'waiting'>('upload');

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsNextEnabled(true); // Enable the "Next" button
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (file) {
      setCurrentUI('waiting'); // Switch to the waiting UI
      // You can add your file upload logic here
      console.log('Uploading file:', file.name);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    setCurrentUI('upload'); // Switch back to the upload UI
    setFile(null); // Clear the selected file
    setIsNextEnabled(false); // Disable the "Next" button
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Upload UI */}
      {currentUI === 'upload' && (
        <>
          <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-sm">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleNext}
                disabled={!isNextEnabled}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Waiting UI */}
      {currentUI === 'waiting' && (
        <div className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-lg font-semibold">Waiting for processing...</p>
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadWithNavigation;
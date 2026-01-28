import React from "react";

// Reusable loading state component
export const LoadingState = ({ message = "Loading..." }) => {
  const displayMessage =
    typeof message === "string" && message.trim() ? message : "Loading...";

  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-gray-600">{displayMessage}</div>
    </div>
  );
};

// Reusable error state component
export const ErrorState = ({ error, title = "Error" }) => {
  // Validate error message
  const errorMessage =
    error && typeof error === "string" ? error : "An unexpected error occurred";
  const errorTitle = title && typeof title === "string" ? title : "Error";

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 mb-6">
      <h2 className="text-lg font-semibold mb-2">{errorTitle}</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

// Reusable empty state component
export const EmptyState = ({ message = "No data available" }) => {
  const displayMessage =
    typeof message === "string" && message.trim()
      ? message
      : "No data available";

  return (
    <div className="bg-white p-12 rounded-lg shadow text-center">
      <p className="text-gray-600">{displayMessage}</p>
    </div>
  );
};

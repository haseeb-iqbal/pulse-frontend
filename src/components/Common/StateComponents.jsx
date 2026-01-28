import React from "react";

// Reusable loading state component
export const LoadingState = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-gray-600">{message}</div>
  </div>
);

// Reusable error state component
export const ErrorState = ({ error, title = "Error" }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 mb-6">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p>{error}</p>
  </div>
);

// Reusable empty state component
export const EmptyState = ({ message = "No data available" }) => (
  <div className="bg-white p-12 rounded-lg shadow text-center">
    <p className="text-gray-600">{message}</p>
  </div>
);

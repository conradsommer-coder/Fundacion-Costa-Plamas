
import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/i18n';
import './src/index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Suppress ResizeObserver loop limit exceeded error
// This is a common benign error in browsers when using certain layout patterns or third-party widgets
const isResizeObserverError = (error: any) => {
  if (!error) return false;
  const message = typeof error === 'string' ? error : (error?.message || String(error));
  return /ResizeObserver loop completed with undelivered notifications.|ResizeObserver loop limit exceeded/i.test(message);
};

// Global error listener
window.addEventListener('error', (e) => {
  if (isResizeObserverError(e.message) || isResizeObserverError(e.error)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}, true); // Use capture phase

// Also catch unhandled rejections
window.addEventListener('unhandledrejection', (e) => {
  if (isResizeObserverError(e.reason)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}, true);

// Override console.error to suppress the message from the console
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (args.some(arg => isResizeObserverError(arg))) {
    return;
  }
  originalConsoleError.apply(console, args);
};

// Also override window.onerror for older browser compatibility
const originalWindowOnError = window.onerror;
window.onerror = (message, source, lineno, colno, error) => {
  if (isResizeObserverError(message) || isResizeObserverError(error)) {
    return true; // Prevents the firing of the default event handler
  }
  if (originalWindowOnError) {
    return originalWindowOnError(message, source, lineno, colno, error);
  }
  return false;
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import { isChunkError, handleChunkError } from '../../utils/helpers';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // ChunkLoadError — yangi deploy bo'lganda eski chunk fayllar topilmaganda sodir bo'ladi.
    // Sahifani bir marta qayta yuklash orqali tuzatiladi.
    if (isChunkError(error)) {
      if (handleChunkError()) {
        return;
      }
    }

    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          message={this.state.error?.message}
          onRetry={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

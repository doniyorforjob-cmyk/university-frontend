import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui';
import ServerError from '@/pages/Errors/ServerError';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * React komponentlarida xatoliklarni ushlash va ko'rsatish
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log xatolikni console ga
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Custom fallback UI (ServerError page)
      return <ServerError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

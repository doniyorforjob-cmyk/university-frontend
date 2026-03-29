import React from 'react';
import ServerError from '@/pages/Errors/ServerError';

interface SectionErrorBoundaryProps {
  sectionType: string;
  fallback?: React.ComponentType<{ retry: () => void }>;
  children: React.ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`${this.props.sectionType} section error:`, error, errorInfo);

    // Future: Send to error monitoring service
    // errorReporting.captureException(error, {
    //   tags: { section: this.props.sectionType },
    //   extra: errorInfo
    // });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultSectionError;
      return <Fallback retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}



const DefaultSectionError: React.FC<{ retry: () => void }> = ({ retry }) => (
  <div className="py-8">
    <ServerError />
  </div>
);
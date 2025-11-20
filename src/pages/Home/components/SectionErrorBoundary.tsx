import React from 'react';

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
  <div className="section-error bg-red-50 border border-red-200 rounded-lg p-6 m-4">
    <div className="text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Bolim Yuklanmadi
      </h3>
      <p className="text-red-600 mb-4 max-w-md mx-auto">
        Bu bolimni yuklashda xatolik yuz berdi. Sahifani qayta yuklashga urinib koring.
      </p>
      <button
        onClick={retry}
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Qayta Urinish
      </button>
    </div>
  </div>
);
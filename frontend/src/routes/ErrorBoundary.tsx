import React from 'react';
import { ErrorPage } from '.';

/**
 * ErrorBoundary prop types
 */
interface ErrorBoundaryProps {
  // ReactNode child components
  children: React.ReactNode;
}

/**
 * ErrorBoundary state types
 */
interface ErrorBoundaryState {
  // The caught error
  error: Error | null;
}

/**
 * Error-catching class component
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public render(): React.ReactNode {
    if (this.state.error) {
      if (this.state.error.name === 'NotFoundError') {
        return (
          <ErrorPage
            title={'400 - Not Found Error'}
            message={this.state.error.message}
          />
        );
      } else {
        return (
          <ErrorPage
            title={'500 - Internal Server Error'}
            message={'A critical error occurred on our server.'}
          />
        );
      }
    }

    return this.props.children;
  }
}

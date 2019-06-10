import React from 'react';
import { ErrorPage } from '.';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

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
        return <ErrorPage message={this.state.error.message} />;
      } else {
        return <h1>500 - Internal server error</h1>;
      }
    }

    return this.props.children;
  }
}

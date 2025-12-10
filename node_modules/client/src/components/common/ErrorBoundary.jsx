import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line no-console
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-text">
          <div className="glass-card max-w-md p-6 text-center border border-state-error/40">
            <h1 className="mb-2 text-lg font-semibold text-state-error">
              Terjadi kesalahan pada aplikasi
            </h1>
            <p className="mb-4 text-sm text-text-muted">
              Mohon maaf, terjadi error yang tidak terduga. Silakan muat ulang halaman.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="rounded-2xl bg-state-error px-4 py-2 text-sm font-medium text-white hover:bg-state-error/90"
            >
              Muat ulang
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;

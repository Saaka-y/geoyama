// components/ErrorBoundary/WeatherErrorBoundary.tsx

import { Component, ReactNode, ErrorInfo } from "react";

interface WeatherErrorBoundaryProps {
  children: ReactNode;
}

interface WeatherErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class WeatherErrorBoundary extends Component<WeatherErrorBoundaryProps, WeatherErrorBoundaryState> {
  constructor(props: WeatherErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WeatherErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "16px",
          textAlign: "center",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "4px",
          margin: "8px"
        }}>
          <p style={{ fontSize: "14px", color: "#856404" }}>
            Failed to load weather information
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WeatherErrorBoundary;

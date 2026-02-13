// components/ErrorBoundary/MapErrorBoundary.tsx

import { Component, ReactNode, ErrorInfo } from "react";

interface MapErrorBoundaryProps {
  children: ReactNode;
}

interface MapErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("MapErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f5f5f5"
        }}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>Failed to load map</h2>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
            The map could not be displayed. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;

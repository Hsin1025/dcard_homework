import React, { ReactNode, Component } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error: Error) {
      return { hasError: true }
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.log({ error, errorInfo })
    }
    render() {
      if(this.state.hasError) {
        return(
          <div>
            <h2>There is an error!</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        )
      }
      return this.props.children
    }
}

export default ErrorBoundary
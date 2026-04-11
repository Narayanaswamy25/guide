
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'An unexpected error occurred.';
      try {
        const parsedError = JSON.parse(this.state.error?.message || '{}');
        if (parsedError.error) {
          errorMessage = `System Error: ${parsedError.error}`;
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-card p-8 border-red-500/20">
            <div className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              Critical System Failure
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
              Operation Interrupted
            </h2>
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-8">
              <p className="text-neutral-400 font-mono text-xs leading-relaxed break-words">
                {errorMessage}
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
            >
              Re-Initialize System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

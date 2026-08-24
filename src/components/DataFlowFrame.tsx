export function DataFlowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg
        aria-hidden
        viewBox="0 0 640 420"
        className="pointer-events-none absolute -inset-4 z-20 hidden h-[calc(100%+2rem)] w-[calc(100%+2rem)] sm:block"
        preserveAspectRatio="none"
      >
        <path
          d="M24 48 H 616 V 372 H 24 Z"
          fill="none"
          stroke="rgba(20,121,239,0.22)"
          strokeWidth="1"
        />
        <path
          className="flow-path"
          d="M24 48 H 320 V 210 H 616"
          fill="none"
          stroke="rgba(20,121,239,0.35)"
          strokeWidth="1.2"
        />
        <circle className="node-pulse" cx="24" cy="48" r="4" fill="#1479ef" />
        <circle className="node-pulse" cx="320" cy="210" r="4" fill="#ff9d2e" style={{ animationDelay: "0.8s" }} />
        <circle className="node-pulse" cx="616" cy="372" r="4" fill="#1479ef" style={{ animationDelay: "1.6s" }} />
        <circle r="3.5" fill="#36c4ff">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M24 48 H 320 V 210 H 616" />
        </circle>
      </svg>
      <span aria-hidden className="scan-line pointer-events-none absolute inset-x-6 top-0 z-10 hidden h-16 sm:block" />
      {children}
    </div>
  );
}

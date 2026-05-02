import { PlusIcon } from "lucide-react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 top-[48px] pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Background Grid Layer */}
      <div className="absolute inset-0 w-full h-full max-w-[1600px] mx-auto">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="page-grid-mask">
              <rect width="100%" height="100%" fill="white" />
              {/* Cutouts for the plus icons - exactly 20x20px to leave a 4px gap around a 12x12px plus */}
              <rect style={{ x: 'calc(var(--grid-offset-x) - 10px)', y: 'calc(var(--grid-offset-y) - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(100% - var(--grid-offset-x) - 10px)', y: 'calc(var(--grid-offset-y) - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(var(--grid-offset-x) - 10px)', y: 'calc(100% - var(--grid-offset-y) - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(100% - var(--grid-offset-x) - 10px)', y: 'calc(100% - var(--grid-offset-y) - 10px)' }} width="20" height="20" fill="black" />
            </mask>
          </defs>
          <g mask="url(#page-grid-mask)" stroke="currentColor" className="text-white/5" strokeWidth="1">
            <line x1="var(--grid-offset-x)" y1="0" x2="var(--grid-offset-x)" y2="100%" />
            <line x1="calc(100% - var(--grid-offset-x))" y1="0" x2="calc(100% - var(--grid-offset-x))" y2="100%" />
            <line x1="0" y1="var(--grid-offset-y)" x2="100%" y2="var(--grid-offset-y)" />
            <line x1="0" y1="calc(100% - var(--grid-offset-y))" x2="100%" y2="calc(100% - var(--grid-offset-y))" />
          </g>
        </svg>

        {/* Plus Intersections */}
        <div 
          className="absolute text-white/20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: 'var(--grid-offset-x)', top: 'var(--grid-offset-y)' }}
        >
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div 
          className="absolute text-white/20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: 'calc(100% - var(--grid-offset-x))', top: 'var(--grid-offset-y)' }}
        >
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div 
          className="absolute text-white/20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: 'var(--grid-offset-x)', top: 'calc(100% - var(--grid-offset-y))' }}
        >
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div 
          className="absolute text-white/20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: 'calc(100% - var(--grid-offset-x))', top: 'calc(100% - var(--grid-offset-y))' }}
        >
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

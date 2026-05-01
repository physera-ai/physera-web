import { PlusIcon } from "lucide-react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Background Grid Layer */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="page-grid-mask">
              <rect width="100%" height="100%" fill="white" />
              {/* Cutouts for the plus icons - exactly 20x20px to leave a 4px gap around a 12x12px plus */}
              <rect style={{ x: 'calc(33.333% - 10px)', y: 'calc(33.333% - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(66.666% - 10px)', y: 'calc(33.333% - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(33.333% - 10px)', y: 'calc(66.666% - 10px)' }} width="20" height="20" fill="black" />
              <rect style={{ x: 'calc(66.666% - 10px)', y: 'calc(66.666% - 10px)' }} width="20" height="20" fill="black" />
            </mask>
          </defs>
          <g mask="url(#page-grid-mask)" stroke="currentColor" className="text-black/5" strokeWidth="1">
            <line x1="33.333%" y1="0" x2="33.333%" y2="100%" />
            <line x1="66.666%" y1="0" x2="66.666%" y2="100%" />
            <line x1="0" y1="33.333%" x2="100%" y2="33.333%" />
            <line x1="0" y1="66.666%" x2="100%" y2="66.666%" />
          </g>
        </svg>

        {/* Plus Intersections */}
        <div className="absolute left-[33.333%] top-[33.333%] -translate-x-1/2 -translate-y-1/2 text-black/15">
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div className="absolute left-[66.666%] top-[33.333%] -translate-x-1/2 -translate-y-1/2 text-black/15">
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div className="absolute left-[33.333%] top-[66.666%] -translate-x-1/2 -translate-y-1/2 text-black/15">
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
        <div className="absolute left-[66.666%] top-[66.666%] -translate-x-1/2 -translate-y-1/2 text-black/15">
          <PlusIcon className="w-3 h-3" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

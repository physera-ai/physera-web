"use client";

import { useEffect, useState } from "react";
import { X as CloseIcon } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setMounted(true);
    else setTimeout(() => setMounted(false), 400); // Wait for exit animation
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100 backdrop-blur-xl" : "opacity-0 backdrop-blur-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`relative w-full max-w-[440px] bg-[#0b0909] border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.96]"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Close modal"
        >
          <CloseIcon size={18} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col gap-6 mt-1">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif italic font-normal text-[36px] text-white tracking-tight leading-none">
              Get in touch
            </h2>
            <p className="text-white/60 text-[15px] font-sans leading-relaxed">
              We&apos;re looking for collaborators to help shape this vision. Drop us a message below.
            </p>
          </div>

          <form 
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              // To be implemented by user
              alert("Message sent! (Implement your backend logic here)");
              onClose();
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[13px] font-medium text-white/70 px-1">Name</label>
              <input 
                id="name"
                type="text" 
                required
                className="w-full bg-white/3 border border-white/10 rounded-[14px] px-4 py-3.5 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:bg-white/5 transition-all font-sans"
                placeholder="Jane Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-medium text-white/70 px-1">Email</label>
              <input 
                id="email"
                type="email" 
                required
                className="w-full bg-white/3 border border-white/10 rounded-[14px] px-4 py-3.5 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:bg-white/5 transition-all font-sans"
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[13px] font-medium text-white/70 px-1">Message</label>
              <textarea 
                id="message"
                required
                rows={4}
                className="w-full bg-white/3 border border-white/10 rounded-[14px] px-4 py-3.5 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:bg-white/5 transition-all font-sans resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 bg-white text-black font-semibold text-[15px] rounded-[14px] py-3.5 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0b0909] transition-all active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>

          <div className="pt-5 mt-1 border-t border-white/10 flex items-center justify-between">
            <span className="text-[13px] text-white/40 font-medium">Follow our journey</span>
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/PhyseraAI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H5.85088C6.35055 0.60609 6.90242 1.38164 7.38621 2.0224L10.6806 6.36824C11.3434 5.63969 11.9981 4.90373 12.6446 4.16055L14.4687 2.09959L15.7777 0.625043C15.9102 0.47399 16.2099 0.153141 16.3215 0H19.7418C19.1364 0.646123 18.491 1.41252 17.9011 2.08338L14.2431 6.24803L12.9313 7.74445C12.7807 7.91658 12.4294 8.3392 12.2829 8.47531C12.4511 8.68475 12.6138 8.91596 12.7786 9.13119L14.3072 11.1497L18.2919 16.4172C18.8294 17.1254 19.4461 17.9933 20 18.6698V20H14.2169C14.0088 19.8369 13.7266 19.4262 13.5526 19.1968L12.7081 18.0869C11.417 16.3991 10.1233 14.6774 8.81488 13.0056C8.6423 13.1638 8.3391 13.5297 8.17367 13.7202L7.18977 14.8436L3.93797 18.5564L3.22971 19.3699C3.06574 19.5594 2.82744 19.8629 2.63004 20H0V19.185C0.24193 18.8682 0.633959 18.4348 0.902926 18.1305C1.25253 17.7329 1.60007 17.3334 1.94555 16.9322L5.9684 12.3071C6.10814 12.1463 7.13287 10.9982 7.16229 10.9007C6.97152 10.5973 6.58148 10.1177 6.35437 9.81953L4.76379 7.73715L0 1.50134V0ZM15.1583 17.9859C15.7609 18.023 16.4215 17.9658 17.0076 18.0061C16.9864 17.8899 15.1382 15.4919 14.9006 15.1772L8.05893 6.13609L5.94637 3.34385L5.32969 2.52793C5.19377 2.34689 5.06307 2.15393 4.9068 1.98984C4.8016 1.87941 3.17141 1.96537 2.87443 1.91568C2.95848 2.08359 3.36795 2.59861 3.50189 2.7724L4.64678 4.26367L9.13379 10.1247L13.2677 15.5245L14.5854 17.2424C14.7098 17.4043 15.0419 17.8693 15.1583 17.9859Z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/physera-ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-[20px] w-[20px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

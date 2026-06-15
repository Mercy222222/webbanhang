"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function Modal({ isOpen, onClose, title, content }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop kính mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          
          {/* Hộp Modal 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Lớp màu phát sáng đằng sau Modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/20 blur-[100px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <span className="text-xs font-bold tracking-widest text-white/50 uppercase mb-4 block">Premium Content</span>
            <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>
            <div className="text-white/70 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: content }} />
            
            <div className="mt-10 flex gap-4">
              <button onClick={onClose} className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-95 transition-transform">
                Tải xuống (Demo)
              </button>
              <button onClick={onClose} className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors">
                Đóng lại
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

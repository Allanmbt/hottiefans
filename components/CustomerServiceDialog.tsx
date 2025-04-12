"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface CustomerServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerServiceDialog({ isOpen, onClose }: CustomerServiceDialogProps) {
  
  // 当客服弹窗打开时防止body滚动
  // 注意：在父组件使用useEffect处理
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }

  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-[#1D1C19]/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-[#1D1C19] p-6 rounded-2xl w-[320px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <h3 className="text-center text-xl font-medium mb-6 text-white">联系客服</h3>

            <div className="flex justify-center items-center gap-4 py-4">
              {/* Telegram */}
              <a
                href="https://t.me/hottiefans"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D1C19] p-3 rounded-full hover:bg-[#2C2B28] transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Image
                    src="/images/telegram.png"
                    alt="Telegram"
                    width={54}
                    height={54}
                  />
                </div>
                <span className="text-sm text-gray-300">Telegram</span>
              </a>

              {/* LINE */}
              <a
                href="https://lin.ee/TO6x9Zx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D1C19] p-3 rounded-full hover:bg-[#2C2B28] transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Image
                    src="/images/line.png"
                    alt="LINE"
                    width={54}
                    height={54}
                  />
                </div>
                <span className="text-sm text-gray-300">LINE</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/message/I3J36BHF5FI7I1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D1C19] p-3 rounded-full hover:bg-[#2C2B28] transition-colors flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    width={54}
                    height={54}
                  />
                </div>
                <span className="text-sm text-gray-300">WhatsApp</span>
              </a>
            </div>

            <p className="text-center text-gray-400 text-sm mt-4">
              联系我们会优先处理您的需求
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
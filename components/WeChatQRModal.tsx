'use client'

interface WeChatQRModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WeChatQRModal({ isOpen, onClose }: WeChatQRModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          添加微信咨询
        </h3>

        {/* 二维码占位图 */}
        <div className="bg-gray-100 w-64 h-64 mx-auto mb-6 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <p className="text-sm mb-2">微信二维码占位</p>
            <p className="text-xs">(请替换为真实二维码)</p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-700 font-medium">
            扫描二维码添加微信
          </p>
          <p className="text-sm text-gray-500">
            工作时间：周一至周五 9:00-18:00
          </p>
          <p className="text-sm text-gray-500">
            我们将在1小时内回复您
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            添加时请备注"Jilo咨询"以便快速响应
          </p>
        </div>
      </div>
    </div>
  )
}

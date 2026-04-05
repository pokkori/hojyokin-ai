'use client'

interface XShareButtonProps {
  text: string
  url?: string
  hashtags?: string[]
  className?: string
}

export function XShareButton({ text, url, hashtags = [], className }: XShareButtonProps) {
  const handleShare = () => {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
    const hashtagStr = hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : ''
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}${hashtagStr}`
    window.open(tweetUrl, '_blank', 'width=600,height=400')
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-sm font-medium ${className ?? ''}`}
      aria-label="Xでシェアする"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <span>Xでシェア</span>
    </button>
  )
}

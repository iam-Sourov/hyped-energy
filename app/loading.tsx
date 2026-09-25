export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF7EF]">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#FF5A1F]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-black [animation-delay:-0.15s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#FCB8FA] [animation-delay:-0.3s]" />
      </div>
    </div>
  )
}

const shimmerClassName =
  'animate-shimmer rounded bg-[linear-gradient(90deg,var(--line)_0%,var(--line-strong)_50%,var(--line)_100%)] bg-[length:200%_100%]'

export default function RepoSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col gap-4 rounded-xl border border-line bg-bg p-5"
    >
      <div className={`h-4 w-3/5 ${shimmerClassName}`} />
      <div className="flex flex-1 flex-col gap-2">
        <div className={`h-3 w-full ${shimmerClassName}`} />
        <div className={`h-3 w-4/5 ${shimmerClassName}`} />
      </div>
      <div className="flex gap-3">
        <div className={`h-3 w-16 ${shimmerClassName}`} />
        <div className={`h-3 w-10 ${shimmerClassName}`} />
      </div>
    </div>
  )
}

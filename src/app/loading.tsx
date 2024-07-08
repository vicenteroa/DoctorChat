export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-gray-100"></div>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    </div>
  )
}

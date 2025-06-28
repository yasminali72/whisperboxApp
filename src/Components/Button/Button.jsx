import { LoaderCircle } from "lucide-react";

export default function Button({name,isLoading}) {
  return (
    <button
    disabled={isLoading}
    type="submit"
    aria-busy={isLoading}
    className="flex w-fit m-auto capitalize justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
  >
    {isLoading ? (
      <>
        <LoaderCircle className="animate-spin me-2 w-5 h-5" /> Processing...
      </>
    ) : (
      name
    )}
  </button>
  
  
  )
}

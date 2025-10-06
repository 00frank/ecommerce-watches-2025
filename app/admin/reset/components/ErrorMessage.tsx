import { useSearchParams } from "next/navigation";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
    </>
  )
}
import { useSearchParams } from "next/navigation";
import { useCreateSession } from "../hooks/useCreateSession";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useCreateSession();

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
    </>
  )
}
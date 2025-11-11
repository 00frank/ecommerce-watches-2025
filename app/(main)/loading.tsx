import LoaderComponent from "@/components/loader";

export default function SearchLoading() {
    return <div className="bg-white flex items-center justify-center min-h-[75dvh]">
        <LoaderComponent />
    </div>
}
export default function LoaderComponent() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div
                className="h-7 w-7 rounded-full bg-primary-200 animate-scale-pulse mr-2.5"
                style={{ animationDelay: "-0.3s" }}
            ></div>
            <div
                className="h-7 w-7 rounded-full bg-primary-300 animate-scale-pulse mr-2.5"
                style={{ animationDelay: "-0.1s" }}
            ></div>
            <div
                className="h-7 w-7 rounded-full bg-primary-400 animate-scale-pulse "
                style={{ animationDelay: "0.1s" }}
            ></div>
        </div>
    )
}
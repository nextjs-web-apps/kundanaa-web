const LoadingPage = () => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" ></div>
            <p className="font-ubntmono text-[14px]">Loading...</p>
        </div>
    )
}

export default LoadingPage
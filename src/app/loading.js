const { Loader2 } = require("lucide-react")

const Loading = () => {
    return (
        <div className="flex items-center gap-2">
            Loading...
            <Loader2 className="mr-2 w-4 h-4 animate-spin text-primary" />
        </div>
    )
}

export default Loading;
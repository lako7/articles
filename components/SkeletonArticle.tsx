import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonArticle() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-64 w-full rounded-lg mx-auto" />
            <div className="mt-16">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-5/6 mb-2" />
                <Skeleton className="h-6 w-4/6 mb-2" />
                <Skeleton className="h-6 w-3/6 mb-2" />
                <Skeleton className="h-6 w-2/6 mb-2" />
            </div>
        </div>
    );
}

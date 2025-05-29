import { Card, Skeleton } from '@heroui/react';

function SkeletonCardBlock() {
    return (
        <Card className="w-[200px] space-y-5 p-4 " radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
            ))}
        </Card>
    );
}

export default function SkeletonTable() {
    return (
        <div>
            {[...Array(5)].map((_, i) => (
                <SkeletonCardBlock key={i} />
            ))}
        </div>
    );
}

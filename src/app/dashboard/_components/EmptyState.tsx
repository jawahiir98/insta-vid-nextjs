import {Button} from "@/components/ui/button";
import Link from "next/link";


export const EmptyState = () => {
    return (
        <div className={'p-5 flex items-center flex-col mt-10 border-2 border-dotted py-24'}>
            <span className={'font-medium text-lg mb-2'}>You do not have any videos.</span>
            <Link href={'/dashboard/create-new'}>
                <Button>Create New</Button>
            </Link>
        </div>
    )
}
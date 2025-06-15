import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ResultsActionsProps {
    actionText?: string
    actionHref?: string
}

export default function ResultsActions({
    actionText = "Analyze Another Pair",
    actionHref = "/analyze"
}: ResultsActionsProps) {
    return (
        <div className="mt-8 text-center">
            <Link href={actionHref}>
                <Button className="gradient-button text-white font-medium px-8">
                    {actionText}
                </Button>
            </Link>
        </div>
    )
} 
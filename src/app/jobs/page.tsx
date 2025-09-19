import { JobBoard } from "./job-board";

export default function JobsPage() {
    return (
        <div className="container py-10">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-headline">Find Your Next Opportunity</h1>
                <p className="text-muted-foreground">Browse through thousands of job listings tailored for you.</p>
            </div>
            <JobBoard />
        </div>
    )
}

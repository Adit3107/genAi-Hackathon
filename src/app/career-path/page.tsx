import { CareerPathGenerator } from "./career-path-generator";

export default function CareerPathPage() {
    return (
        <div className="container py-10">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold font-headline">Generate Your Career Path</h1>
                    <p className="text-muted-foreground">
                        Tell us about your skills and experience, and our AI will suggest potential career paths for you.
                    </p>
                </div>
                <CareerPathGenerator />
            </div>
        </div>
    );
}

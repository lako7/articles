import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
            <Link href="/" className="font-bold text-2xl">
                Commission<span className="text-teal-600">AI</span>
            </Link>

            {/* Button wrapped with Link */}
            <Link href="https://www.thecommission.ai" passHref>
                <Button variant="outline">Join the Waitlist</Button>
            </Link>

            {/* Uncomment this if ModeToggle is required */}
            {/* <ModeToggle /> */}
        </nav>
    );
}

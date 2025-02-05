import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold pt-24">
        This page could not be found :(
      </h1>
      <Link href="/" className="inline-block px-6 py-3 text-lg">
        <Button>Go back home</Button>
      </Link>
    </main>
  );
}

export default NotFound;

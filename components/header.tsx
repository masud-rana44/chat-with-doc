import Link from "next/link";
import HeaderActions from "./header-actions";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/">
          <h1 className="text-2xl font-medium">DocTalk AI</h1>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon, Ghost, icons } from "lucide-react";
export default function UrlLists() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 justify-between">
          <Link
            href={"https://www.youtube.com/watch?v=mr9vOla2AMc&t=2s"}
            className="text-blue-500"
            target="_blank"
          >
            https://www.youtube.com/watch?
          </Link>
          <div className="flex justify-center items-center gap-3">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground hover:bg-muted"
            >
              <CopyIcon className="w-4 h-4" />
              <span className="sr-only">Copy Url</span>
            </Button>
            <span className="flex items-center">
              <EyeIcon className="h-4 w-4" />
              <p>100views</p>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

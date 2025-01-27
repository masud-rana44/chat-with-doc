import React, { MouseEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton({
  isSubmitting,
  submittingLabel,
  children,
  onClick,
}: {
  isSubmitting: boolean;
  submittingLabel: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) {
  return (
    <Button
      onClick={(e) => onClick && onClick(e)}
      className="flex items-center gap-1 disabled:opacity-50"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting && <Loader2 className="animate-spin" />}
      <span>{isSubmitting ? submittingLabel : children}</span>
    </Button>
  );
}

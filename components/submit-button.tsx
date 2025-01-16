import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SubmitButton({
  isSubmitting,
  submittingLabel,
  children,
}: {
  isSubmitting: boolean;
  submittingLabel: string;
  children: ReactNode;
}) {
  return (
    <Button
      className="flex items-center gap-1"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting && <Loader2 className="animate-spin" />}
      <span>{isSubmitting ? submittingLabel : children}</span>
    </Button>
  );
}

import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";

export function ButtonLoading({ Content }: { Content: string }) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {Content}
    </Button>
  );
}

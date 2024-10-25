import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

import { Switch } from "@/components/ui/switch";
import { isDevMode } from "@/dal/dev-mode-utils";
import DevMode from "./dev.client";

export default async function Dev() {
  const isEnabled = await isDevMode();
  return <DevMode initialIsEnabled={isEnabled} />;
}

export function DevFallback() {
  return (
    <Card className="w-fit bg-primary/20">
      <CardHeader className="p-2">
        <CardTitle className="text-sm font-semibold">
          <div className="flex items-center space-x-2">
            <Switch id="dev-mode" disabled={true} />
            <Label htmlFor="dev-mode">Dev Mode</Label>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

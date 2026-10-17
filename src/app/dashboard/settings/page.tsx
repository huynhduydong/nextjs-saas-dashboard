import { Button, Card, CardHeader, Input } from "@/components/ui";
export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <Card>
        <CardHeader title="Workspace" subtitle="Shown on invoices and shared reports." />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm"><span className="font-medium">Workspace name</span><Input defaultValue="Pulse Demo Inc." /></label>
          <label className="space-y-1.5 text-sm"><span className="font-medium">Billing email</span><Input defaultValue="billing@pulse.example" /></label>
        </div>
        <div className="flex justify-end border-t border-zinc-100 px-5 py-3 dark:border-zinc-800"><Button>Save changes</Button></div>
      </Card>
    </div>
  );
}

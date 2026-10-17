import { Activity } from "lucide-react";
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow"><Activity size={18} /></div>
      <span className="text-base font-semibold tracking-tight">Pulse</span>
    </div>
  );
}

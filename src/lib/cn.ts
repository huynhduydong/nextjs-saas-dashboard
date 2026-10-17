import clsx, { type ClassValue } from "clsx";
export const cn = (...c: ClassValue[]) => clsx(c);
export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

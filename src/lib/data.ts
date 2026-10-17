// All data in this file is synthetic, generated from a fixed seed for demo purposes.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

export const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export const revenueSeries = months.map((m, i) => {
  const base = 42000 + i * 5200;
  const revenue = Math.round(base + rand() * 6000);
  const expenses = Math.round(revenue * (0.48 + rand() * 0.1));
  return { month: m, revenue, expenses, profit: revenue - expenses };
});

export const signupSeries = months.map((m, i) => ({
  month: m,
  trials: Math.round(380 + i * 34 + rand() * 90),
  paid: Math.round(120 + i * 15 + rand() * 40),
}));

export const channels = [
  { name: "Organic", value: 38, color: "#6366f1" },
  { name: "Paid ads", value: 24, color: "#22c55e" },
  { name: "Referral", value: 21, color: "#f59e0b" },
  { name: "Partners", value: 17, color: "#ec4899" },
];

export const kpis = [
  { label: "Monthly recurring revenue", value: "$98,420", delta: 12.4, hint: "vs last month" },
  { label: "Active subscribers", value: "4,812", delta: 8.1, hint: "vs last month" },
  { label: "Churn rate", value: "2.31%", delta: -0.4, hint: "lower is better", invert: true },
  { label: "Avg. revenue per user", value: "$20.45", delta: 3.9, hint: "vs last month" },
];

const first = ["Ava", "Liam", "Mia", "Noah", "Zoe", "Ethan", "Lena", "Omar", "Yuki", "Sofia", "Lucas", "Priya", "Mateo", "Hana", "Ivan", "Chloe", "Arjun", "Elena", "Kai", "Nora"];
const last = ["Nguyen", "Smith", "Garcia", "Kim", "Müller", "Rossi", "Tanaka", "Silva", "Patel", "Dubois", "Novak", "Brown", "Haddad", "Larsen", "Costa"];
const companies = ["Northwind", "Acme Labs", "Globex", "Initech", "Umbrella", "Hooli", "Stark Retail", "Wayne Logistics", "Vandelay", "Pied Piper", "Soylent", "Cyberdyne", "Tyrell", "Wonka Foods", "Oscorp"];
export const plans = ["Starter", "Growth", "Scale", "Enterprise"] as const;
const planPrice: Record<string, number> = { Starter: 19, Growth: 49, Scale: 149, Enterprise: 499 };
export const statuses = ["Active", "Trialing", "Past due", "Canceled"] as const;

export type Customer = {
  id: string; name: string; email: string; company: string;
  plan: (typeof plans)[number]; status: (typeof statuses)[number];
  mrr: number; seats: number; joined: string; country: string;
};

const countries = ["US", "DE", "GB", "VN", "JP", "FR", "BR", "IN", "CA", "AU"];

export const customers: Customer[] = Array.from({ length: 48 }, (_, i) => {
  const f = pick(first), l = pick(last), company = pick(companies);
  const plan = plans[Math.min(3, Math.floor(rand() * rand() * 5))];
  const r = rand();
  const status = r < 0.72 ? "Active" : r < 0.84 ? "Trialing" : r < 0.93 ? "Past due" : "Canceled";
  const seats = 1 + Math.floor(rand() * (plan === "Enterprise" ? 120 : 25));
  const d = new Date(2026, 9, 15);
  d.setDate(d.getDate() - Math.floor(rand() * 340));
  return {
    id: `CUS-${(1040 + i).toString()}`,
    name: `${f} ${l}`,
    email: `${f.toLowerCase()}.${l.toLowerCase().replace("ü", "u")}@${company.toLowerCase().replace(/\s/g, "")}.example`,
    company, plan, status,
    mrr: status === "Canceled" ? 0 : planPrice[plan] * (plan === "Starter" ? 1 : Math.ceil(seats / 5)),
    seats,
    joined: d.toISOString().slice(0, 10),
    country: pick(countries),
  };
});

export const activity = [
  { who: "Northwind", what: "upgraded to Scale", when: "4 min ago", tone: "up" },
  { who: "Acme Labs", what: "added 12 seats", when: "38 min ago", tone: "up" },
  { who: "Globex", what: "payment failed (card expired)", when: "1 h ago", tone: "down" },
  { who: "Pied Piper", what: "started a 14-day trial", when: "2 h ago", tone: "neutral" },
  { who: "Initech", what: "downgraded to Starter", when: "5 h ago", tone: "down" },
  { who: "Hooli", what: "renewed annual Enterprise", when: "yesterday", tone: "up" },
];

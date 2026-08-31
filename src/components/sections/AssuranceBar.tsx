import Marquee from "@/components/motion/Marquee";
import { assurances } from "@/data/site";

export default function AssuranceBar() {
  return (
    <div className="border-y border-ink/10 bg-bone-2/60 py-1">
      <Marquee
        speed={48}
        separator="—"
        items={assurances.map((a) => (
          <span
            key={a}
            className="font-display text-[0.58rem] font-bold uppercase tracking-[0.22em] text-ink"
          >
            {a}
          </span>
        ))}
      />
    </div>
  );
}

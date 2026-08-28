/** A small wax-seal medallion — gold ring, dark ink fill, stacked serif
 *  lines — used for sale/sold-out/new markers on product tiles. */
export default function VintageBadge({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-full p-[2px] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.55)] transition-transform duration-500 ${className}`}
      style={{
        background: "linear-gradient(155deg, #d8b466 0%, #8a6a2e 45%, #d8b466 100%)",
      }}
    >
      <div
        className="grid h-11 w-11 place-items-center rounded-full text-center md:h-12 md:w-12"
        style={{
          background: "radial-gradient(120% 120% at 30% 20%, #3a2b1c 0%, #1c130b 75%)",
        }}
      >
        <span className="font-display text-[0.48rem] font-semibold uppercase leading-[1.25] tracking-[0.08em] text-[#f2e8d0] md:text-[0.52rem]">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

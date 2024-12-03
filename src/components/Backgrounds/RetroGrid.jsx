import { cn } from "@/lib/utils";

export default function RetroGrid({ className }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full lg-1043:h-[147vh] lg-3:h-[141vh] max-2xl:h-[125vh] w-full overflow-hidden opacity-100 ",
        className
      )}
    >
      {/* Grid */}
      <div className="absolute  [transform:rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh]  [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t to-transparent to-80% from-[#161616]" />
    </div>
  );
}

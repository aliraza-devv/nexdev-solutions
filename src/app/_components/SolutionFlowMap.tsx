"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./SolutionFlowMap.module.css";

// Ported from reference/nexdev-solution-flowmap-v2.html. Node ids, stage
// grouping, and the pipeline values match the reference exactly. All of
// the animation (stage advance, connector paint, particle canvas, the
// pipeline count up) is done through refs and direct DOM writes, never
// React state, so pointermove and the render loop never trigger a
// React commit.
type NodeKey = "n_in" | "n0" | "n1" | "n2a" | "n2b" | "n3" | "n4";

const STAGES: NodeKey[][] = [["n0"], ["n1"], ["n2a", "n2b"], ["n3"], ["n4"]];
const PIPE_BASE = 4000;
const PIPE_MIN_STEP = 120;
const PIPE_MAX_STEP = 340;
const AUTO_ADVANCE_MS = 2600;
const PARTICLE_COUNT = 14;
const TRAIL_STEPS = 5;
const TRAIL_SPACING = 0.016;
const STAGE_COUNT = 5;
const VIEWBOX_W = 900;
const VIEWBOX_H = 640;

type Branch = "a" | "b";

interface LinkSeg {
  el: SVGPathElement;
  tag: number;
  branch: Branch | null;
}

// Each particle travels the full path top to bottom, one audience
// member entering at 00 and moving through every stage in order, not
// just whichever stage happens to be lit. It picks a branch once at
// the fork and stays qualifying and converting once, then loops back
// to the top, a steady stream rather than a burst confined to the
// currently active stage.
interface Particle {
  branch: Branch;
  stage: number;
  t: number;
  speed: number;
}

function money(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

// Colour a particle by how far it has travelled: white where it
// enters as raw audience, brand light-purple once it is being
// qualified, full brand purple right as it converts at the bottom.
const PARTICLE_STOPS: Array<[number, number, number]> = [
  [255, 255, 255],
  [168, 155, 255],
  [92, 69, 253],
];
function particleColor(progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  const scaled = p * (PARTICLE_STOPS.length - 1);
  const i = Math.min(PARTICLE_STOPS.length - 2, Math.floor(scaled));
  const t = scaled - i;
  const [r0, g0, b0] = PARTICLE_STOPS[i];
  const [r1, g1, b1] = PARTICLE_STOPS[i + 1];
  const r = Math.round(r0 + (r1 - r0) * t);
  const g = Math.round(g0 + (g1 - g0) * t);
  const b = Math.round(b0 + (b1 - b0) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function SolutionFlowMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pipeValueRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<NodeKey, HTMLDivElement | null>>({
    n_in: null,
    n0: null,
    n1: null,
    n2a: null,
    n2b: null,
    n3: null,
    n4: null,
  });

  useEffect(() => {
    const map = mapRef.current;
    const links = linksRef.current;
    const canvas = canvasRef.current;
    const pipeValueEl = pipeValueRef.current;
    if (!map || !links || !canvas || !pipeValueEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = nodeRefs.current;

    let active = 0;
    let hovering = false;
    let segs: LinkSeg[] = [];

    function centre(el: HTMLElement, side: "top" | "bottom") {
      const b = el.getBoundingClientRect();
      const m = map!.getBoundingClientRect();
      return {
        x: ((b.left + b.width / 2 - m.left) / m.width) * VIEWBOX_W,
        y: ((side === "top" ? b.top : b.bottom) - m.top) / m.height * VIEWBOX_H,
      };
    }

    function build() {
      links!.querySelectorAll("path").forEach((p) => p.remove());
      segs = [];
      function link(a: HTMLElement, b: HTMLElement, tag: number, branch: Branch | null) {
        const p1 = centre(a, "bottom");
        const p2 = centre(b, "top");
        const midY = (p1.y + p2.y) / 2;
        const d = `M${p1.x} ${p1.y} C ${p1.x} ${midY} ${p2.x} ${midY} ${p2.x} ${p2.y}`;
        const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
        el.setAttribute("d", d);
        links!.appendChild(el);
        segs.push({ el, tag, branch });
      }
      if (!els.n_in || !els.n0 || !els.n1 || !els.n2a || !els.n2b || !els.n3 || !els.n4) return;
      link(els.n_in, els.n0, 0, null);
      link(els.n0, els.n1, 1, null);
      link(els.n1, els.n2a, 2, "a");
      link(els.n1, els.n2b, 2, "b");
      link(els.n2a, els.n3, 3, "a");
      link(els.n2b, els.n3, 3, "b");
      link(els.n3, els.n4, 4, null);
      paint();
    }

    function segmentFor(stage: number, branch: Branch): LinkSeg | undefined {
      return segs.find((s) => s.tag === stage && (s.branch === null || s.branch === branch));
    }

    function paint() {
      segs.forEach((s) => s.el.classList.toggle(styles.lit, s.tag <= active));
    }

    let shown = 0;
    let countId = 0;
    // The number only climbs when a particle actually completes the
    // full path and reaches the "Booked calls..." node, not on a
    // timer, so it reads as traffic converting rather than a generic
    // ticking counter.
    let pipelineTotal = PIPE_BASE;
    function countTo(target: number) {
      cancelAnimationFrame(countId);
      if (reduce) {
        pipeValueEl!.textContent = money(target);
        shown = target;
        return;
      }
      const from = shown;
      const t0 = performance.now();
      const run = (now: number) => {
        const k = Math.min(1, (now - t0) / 600);
        const eased = 1 - Math.pow(1 - k, 3);
        shown = from + (target - from) * eased;
        pipeValueEl!.textContent = money(shown);
        if (k < 1) countId = requestAnimationFrame(run);
      };
      countId = requestAnimationFrame(run);
    }

    function setActive(i: number) {
      active = i;
      (["n1", "n2a", "n2b", "n3", "n4"] as NodeKey[]).forEach((k) => {
        els[k]?.classList.remove(styles.on);
      });
      STAGES[i].forEach((k) => {
        if (k !== "n0") els[k]?.classList.add(styles.on);
      });
      paint();
    }

    let autoId: ReturnType<typeof setInterval> | undefined;
    function startAuto() {
      if (reduce) return;
      stopAuto();
      autoId = setInterval(() => {
        if (!hovering) setActive((active + 1) % STAGES.length);
      }, AUTO_ADVANCE_MS);
    }
    function stopAuto() {
      clearInterval(autoId);
    }

    const cleanupFns: Array<() => void> = [];
    (Object.keys(els) as NodeKey[]).forEach((k) => {
      const stage = STAGES.findIndex((s) => s.indexOf(k) >= 0);
      if (stage < 0) return;
      const el = els[k];
      if (!el) return;
      const onEnter = () => {
        hovering = true;
        setActive(stage);
      };
      const onLeave = () => {
        hovering = false;
      };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: Particle[] = [];
    let rafId = 0;
    let running = false;

    function size() {
      if (!map) return;
      w = map.clientWidth;
      h = map.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      // Every particle enters at the very top (stage 0) and queues up
      // one by one, negative t meaning "not arrived yet", so the flow
      // reads as a single-file audience stream rather than a burst
      // scattered randomly across the whole path.
      dots = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        branch: Math.random() < 0.5 ? "a" : "b",
        stage: 0,
        t: -((i / PARTICLE_COUNT) * STAGE_COUNT) - Math.random() * 0.3,
        // Slowed from the reference's 0.006-0.009 - at that pace the
        // audience stream read as a rushed blur instead of a readable,
        // one-at-a-time flow through the steps.
        speed: 0.0026 + Math.random() * 0.0013,
      }));
    }

    function frame() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      if (!segs.length) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      dots.forEach((d) => {
        d.t += d.speed;
        if (d.t > 1) {
          d.t -= 1;
          d.stage += 1;
          if (d.stage >= STAGE_COUNT) {
            // This particle just reached "Booked calls. Sales.
            // Signups." - count it as a conversion.
            d.stage = 0;
            d.branch = Math.random() < 0.5 ? "a" : "b";
            pipelineTotal += PIPE_MIN_STEP + Math.random() * (PIPE_MAX_STEP - PIPE_MIN_STEP);
            countTo(pipelineTotal);
          }
        }
        if (d.t < 0) return;
        const seg = segmentFor(d.stage, d.branch);
        if (!seg) return;
        const length = seg.el.getTotalLength();
        const progress = (d.stage + d.t) / (STAGE_COUNT - 1);
        const color = particleColor(progress);
        // A short fading tail behind the head, so each particle reads
        // as one continuous moving thread rather than an isolated dot,
        // which is what made the line look broken/dashed.
        for (let i = TRAIL_STEPS; i >= 0; i--) {
          const trailT = d.t - i * TRAIL_SPACING;
          if (trailT < 0) continue;
          const p = seg.el.getPointAtLength(length * trailT);
          const x = (p.x / VIEWBOX_W) * w;
          const y = (p.y / VIEWBOX_H) * h;
          const fade = 1 - i / (TRAIL_STEPS + 1);
          ctx.beginPath();
          ctx.arc(x, y, 2.6 * fade, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = fade;
          ctx.shadowColor = color;
          ctx.shadowBlur = i === 0 ? 5 + progress * 5 : 0;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });
      rafId = requestAnimationFrame(frame);
    }

    let io: IntersectionObserver | null = null;
    function handleVisibilityChange() {
      if (document.hidden) {
        running = false;
        stopAuto();
        cancelAnimationFrame(rafId);
      } else if (map && map.getBoundingClientRect().top < window.innerHeight) {
        running = true;
        startAuto();
        frame();
      }
    }

    function handleResize() {
      size();
      build();
    }

    let fontsReadyHandled = false;
    function handleFontsReady() {
      if (fontsReadyHandled) return;
      fontsReadyHandled = true;
      size();
      build();
    }

    function boot() {
      size();
      build();
      seed();
      shown = pipelineTotal;
      pipeValueEl!.textContent = money(pipelineTotal);
      let rebuiltOnVisible = false;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Anything above this section (images, fonts, other
              // async content) can still shift its layout after the
              // initial mount-time build() ran, leaving connectors
              // measured against stale node positions. One rebuild
              // right as it actually comes into view catches that.
              if (!rebuiltOnVisible) {
                rebuiltOnVisible = true;
                size();
                build();
              }
              running = true;
              startAuto();
              frame();
            } else {
              running = false;
              stopAuto();
              cancelAnimationFrame(rafId);
            }
          });
        },
        { threshold: 0.12 },
      );
      io.observe(map!);
      window.addEventListener("resize", handleResize);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      // Font swap shifts box positions after the DOM has already
      // measured them once, so the connectors are rebuilt again once
      // webfonts have actually finished loading.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(handleFontsReady);
      }
      setActive(0);
    }

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(boot);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(countId);
      stopAuto();
      io?.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.hold}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>The Solution</span>
          {/* Same per-line slide-up reveal as OurProcess's heading:
              overflow-hidden wrapper + a motion.span sliding from
              y:100%, staggered so the second line follows the first. */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            <span
              // pb-2, not the usual pb-1: "redesign" is italic and has a
              // descender (the g), which the reveal mask's overflow-hidden
              // box would otherwise clip at the tighter padding.
              className="block overflow-hidden pb-2"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="The fix isn't a redesign."
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {/* The period lives right after "redesign" (not on the
                    next line) - it's the sentence's closing punctuation,
                    not the next sentence's opening one. */}
                The fix isn&apos;t a <em>redesign</em>.
              </motion.span>
            </span>
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="It's a system."
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                It&apos;s a system.
              </motion.span>
            </span>
          </motion.h2>
        </div>

        <div className={styles.map} ref={mapRef}>
          <div className={styles.svgwrap}>
            <svg
              className={styles.links}
              ref={linksRef}
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="solutionFlowLitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a89bff" />
                  <stop offset="1" stopColor="#5c45fd" />
                </linearGradient>
              </defs>
            </svg>
            <canvas className={styles.dots} ref={canvasRef} />
          </div>

          <div className={styles.grid}>
            <div
              className={`${styles.node} ${styles.cap} ${styles.rowFull}`}
              ref={(el) => {
                nodeRefs.current.n_in = el;
              }}
            >
              <span className={styles.idx}>00</span>
              <div>
                <h3>The audience you already have</h3>
                <p className={styles.sub}>Paid, organic, or referrals</p>
              </div>
            </div>

            <div
              className={`${styles.node} ${styles.key} ${styles.rowFull}`}
              ref={(el) => {
                nodeRefs.current.n0 = el;
              }}
            >
              <span className={styles.idx}>01</span>
              <div>
                <h3>SYNC Audit</h3>
                <p className={styles.sub}>Why they leave, before we design</p>
              </div>
            </div>

            <div
              className={`${styles.node} ${styles.rowFull}`}
              ref={(el) => {
                nodeRefs.current.n1 = el;
              }}
            >
              <span className={styles.idx}>02</span>
              <div>
                <h3>A page built to sell</h3>
                <p className={styles.sub}>Website or landing page</p>
              </div>
            </div>

            <div className={styles.forklabel}>then it splits, by what you sell</div>

            <div
              className={styles.node}
              ref={(el) => {
                nodeRefs.current.n2a = el;
              }}
            >
              <span className={styles.idx}>03</span>
              <div>
                <h3>Lead qualification system</h3>
                <p className={styles.sub}>Service and B2B</p>
              </div>
            </div>
            <div
              className={styles.node}
              ref={(el) => {
                nodeRefs.current.n2b = el;
              }}
            >
              <span className={styles.idx}>03</span>
              <div>
                <h3>Frictionless checkout</h3>
                <p className={styles.sub}>E-commerce</p>
              </div>
            </div>

            <div
              className={`${styles.node} ${styles.rowFull}`}
              ref={(el) => {
                nodeRefs.current.n3 = el;
              }}
            >
              <span className={styles.idx}>04</span>
              <div>
                <h3>Design, applied last</h3>
                <p className={styles.sub}>Once the selling already works</p>
              </div>
            </div>

            <div
              className={`${styles.node} ${styles.out} ${styles.wide} ${styles.rowFull}`}
              ref={(el) => {
                nodeRefs.current.n4 = el;
              }}
            >
              <span className={styles.idx}>&#9679;</span>
              <div>
                <h3>Booked calls. Sales. Signups.</h3>
                <p className={styles.sub}>From traffic you already pay for</p>
              </div>
              <div className={styles.pipe}>
                <div className={styles.pipeValue} ref={pipeValueRef}>
                  $0
                </div>
                <div className={styles.pipeSub}>monthly pipeline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

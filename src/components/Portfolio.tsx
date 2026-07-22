"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactPlaceholders, Language, profile } from "../content/profile";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={diagonal ? "arrow arrow-diagonal" : "arrow"}>↓</span>;
}

const introAssets = [
  "/media/hero/intro/hero-homepage-clean.webp",
  "/media/hero/intro/forest-middle-left.webp",
  "/media/hero/intro/forest-middle-right.webp",
  "/media/hero/intro/forest-near-left.webp",
  "/media/hero/intro/forest-near-right.webp",
  "/media/hero/intro/forest-foreground-leaves.webp",
  "/media/hero/intro/branch-top-left-base.webp",
  "/media/hero/intro/branch-top-left-leaves-a.webp",
  "/media/hero/intro/branch-top-left-leaves-b.webp",
  "/media/hero/intro/branch-top-right-base.webp",
  "/media/hero/intro/branch-top-right-leaves-a.webp",
  "/media/hero/intro/branch-top-right-leaves-b.webp",
] as const;

const introSessionKey = "zpp-forest-intro-seen-v7";

type IntroPhase = "loading" | "playing" | "done";

type HeroMotionTrack = {
  selector: string;
  from: gsap.TweenVars;
  introAt: number;
  introDuration: number;
  scrollAt: number;
  scrollDuration: number;
};

const heroMotionTracks = (): HeroMotionTrack[] => [
  {
    selector: ".hero-name--cn",
    from: { x: () => -Math.max(window.innerWidth * 0.34, 360), rotate: -5, autoAlpha: 0 },
    introAt: 4.02,
    introDuration: 0.78,
    scrollAt: 0.05,
    scrollDuration: 0.4,
  },
  {
    selector: ".hero-name--en",
    from: { y: () => Math.max(window.innerHeight * 0.44, 360), rotate: 4, autoAlpha: 0 },
    introAt: 4.1,
    introDuration: 0.78,
    scrollAt: 0.07,
    scrollDuration: 0.4,
  },
  {
    selector: ".hero-copy",
    from: { x: () => Math.max(window.innerWidth * 0.78, 720), autoAlpha: 0 },
    introAt: 4.14,
    introDuration: 0.78,
    scrollAt: 0.08,
    scrollDuration: 0.4,
  },
  {
    selector: ".explore",
    from: { x: () => Math.max(window.innerWidth * 0.2, 190), autoAlpha: 0 },
    introAt: 4.2,
    introDuration: 0.68,
    scrollAt: 0.1,
    scrollDuration: 0.34,
  },
  {
    selector: ".hero-polyhedron--large",
    from: { y: () => -Math.max(window.innerHeight * 0.38, 320), rotate: -68, autoAlpha: 0 },
    introAt: 4.06,
    introDuration: 0.78,
    scrollAt: 0.04,
    scrollDuration: 0.38,
  },
  {
    selector: ".hero-polyhedron--small",
    from: { x: () => Math.max(window.innerWidth * 0.38, 360), rotate: 92, autoAlpha: 0 },
    introAt: 4.16,
    introDuration: 0.74,
    scrollAt: 0.08,
    scrollDuration: 0.36,
  },
  {
    selector: ".hero-polyhedron--pyramid",
    from: { y: () => Math.max(window.innerHeight * 0.38, 320), rotate: 48, autoAlpha: 0 },
    introAt: 4.2,
    introDuration: 0.74,
    scrollAt: 0.1,
    scrollDuration: 0.34,
  },
  {
    selector: ".hero-sculpture",
    from: {
      x: () => Math.max(window.innerWidth * 0.54, 620),
      y: () => Math.max(window.innerHeight * 0.1, 80),
      rotate: 8,
      autoAlpha: 0,
    },
    introAt: 4.12,
    introDuration: 0.9,
    scrollAt: 0.06,
    scrollDuration: 0.44,
  },
];

function Bird({ flock = false }: { flock?: boolean }) {
  const bird = (className: string) => (
    <span className={`environment-bird ${className}`}>
      <i className="environment-bird-wing environment-bird-wing--left" />
      <i className="environment-bird-body" />
      <i className="environment-bird-wing environment-bird-wing--right" />
    </span>
  );

  return (
    <span className="environment-bird-group" aria-hidden="true">
      {bird("environment-bird--one")}
      {flock && bird("environment-bird--two")}
      {flock && bird("environment-bird--three")}
    </span>
  );
}

type InterludeProps = {
  index: string;
  variant: "painting" | "sculpture" | "wave" | "collage";
  title: string;
  note: string;
};

function ArtInterlude({ index, variant, title, note }: InterludeProps) {
  const isObservation = index === "II";

  return (
    <section className={`art-interlude art-interlude--${variant}${isObservation ? " art-interlude--observation" : ""}`} aria-label={title}>
      <div className="torn-edge torn-edge--top" aria-hidden="true" />
      <div className="interlude-canvas">
        {isObservation && (
          <>
            <Image unoptimized className="observation-landscape" src="/media/interlude/observation/hero-landscape-v2.webp" alt="暗色古典油画风格的湖泊、月亮、山谷与石台" fill sizes="100vw" />
            <div className="observation-ring-system" aria-hidden="true">
              <div className="observation-ring-rotor">
                <i className="observation-ring" />
                <i className="observation-ring-marker observation-ring-marker--one" />
                <i className="observation-ring-marker observation-ring-marker--two" />
              </div>
            </div>
            <div className="observation-sculpture">
              <Image unoptimized className="observation-bust" src="/media/interlude/observation/hero-bust-v2.webp" alt="古典石膏半身像" width={825} height={1359} sizes="(max-width: 640px) 95vw, 42vw" />
            </div>
            <div className="observation-polyhedron-flight" aria-hidden="true">
              <i className="observation-polyhedron-shadow" />
              <Image unoptimized className="observation-polyhedron" src="/media/interlude/observation/hero-polyhedron-v2.webp" alt="" width={658} height={593} sizes="(max-width: 640px) 21vw, 11vw" />
            </div>
          </>
        )}
        {(variant === "painting" || variant === "collage") && (
          <Image unoptimized className="interlude-painting interlude-layer" src="/media/art/twilight-painting-warm.webp" alt="原创暮光油画" fill sizes="100vw" />
        )}
        {!isObservation && (variant === "sculpture" || variant === "collage" || variant === "wave") && (
          <Image unoptimized className="interlude-bust interlude-layer" src="/media/art/plaster-bust.webp" alt="带油画笔触的原创石膏胸像" width={1024} height={1536} sizes="(max-width: 640px) 90vw, 48vw" />
        )}
        {!isObservation && (variant === "painting" || variant === "sculpture" || variant === "collage") && (
          <Image unoptimized className="interlude-hand interlude-layer" src="/media/art/plaster-hand.webp" alt="原创石膏手臂雕塑" width={1577} height={997} sizes="(max-width: 640px) 110vw, 66vw" />
        )}
        {variant === "wave" && (
          <div className="paper-wave" aria-hidden="true">
            {Array.from({ length: 24 }, (_, tile) => <i className="wave-tile" key={tile} style={{ "--tile": tile } as React.CSSProperties} />)}
          </div>
        )}
        <div className="interlude-copy interlude-layer"><span>{index} / ART INTERMISSION</span><h2>{title}</h2><p>{note}</p></div>
        <span className="interlude-script interlude-layer" aria-hidden="true">between chapters</span>
      </div>
      <div className="torn-edge torn-edge--bottom" aria-hidden="true" />
    </section>
  );
}

export function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const introTimeline = useRef<gsap.core.Timeline | null>(null);
  const [lang, setLang] = useState<Language>("zh");
  const [active, setActive] = useState("hero");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [introPhase, setIntroPhase] = useState<IntroPhase>("loading");
  const content = profile[lang];

  const finalizeIntro = useCallback(() => {
    window.sessionStorage.setItem(introSessionKey, "1");
    document.documentElement.classList.remove("intro-lock");
    setIntroPhase("done");
  }, []);

  const skipIntro = useCallback(() => {
    const timeline = introTimeline.current;
    if (timeline) {
      timeline.eventCallback("onComplete", null);
      timeline.progress(1).kill();
      introTimeline.current = null;
    }
    if (root.current) {
      gsap.set(
        root.current.querySelectorAll(".site-nav, .hero-eyebrow, .hero-name, .hero-copy, .explore, .hero-sculpture, .hero-polyhedron, .hero-environment"),
        { clearProps: "all" },
      );
    }
    finalizeIntro();
  }, [finalizeIntro]);

  useLayoutEffect(() => {
    if (!root.current) return;
    if (root.current.dataset.intro === "done") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const alreadySeen = window.sessionStorage.getItem(introSessionKey) === "1";

    if (alreadySeen || media.matches) {
      gsap.set(
        root.current.querySelectorAll(".site-nav, .hero-eyebrow, .hero-name, .hero-copy, .explore, .hero-sculpture, .hero-polyhedron, .hero-environment"),
        { autoAlpha: 1 },
      );
      gsap.set(root.current.querySelector(".hero-landscape"), { scale: 1.015, xPercent: 0, yPercent: 0 });
      const frame = window.requestAnimationFrame(() => setIntroPhase("done"));
      if (media.matches) {
        gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power1.out", clearProps: "all" });
      }
      return () => window.cancelAnimationFrame(frame);
    }

    let disposed = false;
    document.documentElement.classList.add("intro-lock");

    const preload = introAssets.map((src) => new Promise<void>((resolve) => {
      const image = new window.Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (typeof image.decode === "function") image.decode().catch(() => undefined).finally(resolve);
        else resolve();
      };
      image.onload = finish;
      image.onerror = finish;
      image.src = src;
      if (image.complete) finish();
    }));

    Promise.all(preload).then(() => {
      if (disposed || !root.current) return;
      const scope = root.current;
      const ui = scope.querySelectorAll(".site-nav, .hero-eyebrow, .hero-name, .hero-copy, .explore, .hero-sculpture, .hero-polyhedron, .hero-environment");
      const scene = scope.querySelector(".intro-scene");

      gsap.set(ui, { autoAlpha: 0 });
      gsap.set(scene, { autoAlpha: 0 });
      gsap.set(scope.querySelector(".hero-landscape"), { scale: 1.12, xPercent: 1.2, yPercent: 1.1, force3D: true });
      gsap.set(scope.querySelector(".intro-fog"), { scale: 1.02, opacity: 0.36 });
      gsap.set(scope.querySelector(".intro-light"), { opacity: 0.05, scale: 0.72 });
      gsap.set(scope.querySelector(".intro-middle--left"), { scale: 0.92, xPercent: -2, yPercent: 1, opacity: 0, force3D: false });
      gsap.set(scope.querySelector(".intro-middle--right"), { scale: 0.92, xPercent: 2, yPercent: -1, opacity: 0, force3D: false });
      gsap.set(scope.querySelector(".intro-near--left"), { scale: 1.02, xPercent: -1, yPercent: 0, opacity: 0, force3D: false });
      gsap.set(scope.querySelector(".intro-near--right"), { scale: 1.02, xPercent: 1, yPercent: 0, opacity: 0, force3D: false });
      gsap.set(scope.querySelector(".intro-foreground-leaves"), { scale: 1.02, xPercent: 0, yPercent: 0, opacity: 0, force3D: false });
      gsap.set(scope.querySelector(".intro-vignette"), { opacity: 0 });
      setIntroPhase("playing");

      const timeline = gsap.timeline({
        onComplete: () => {
          introTimeline.current = null;
          gsap.set(ui, { clearProps: "all" });
          finalizeIntro();
        },
      });
      introTimeline.current = timeline;

      timeline
        .set(scene, { autoAlpha: 1 }, 0)
        .to(".intro-middle", { opacity: 0.72, duration: 0.76, ease: "power1.out" }, 0.02)
        .to(".intro-near", { opacity: 0.6, duration: 0.78, ease: "power1.out" }, 0.08)
        .to(".intro-vignette", { opacity: 0.3, duration: 0.7, ease: "power1.out" }, 0.08)
        .to(".intro-foreground-leaves", { opacity: 0.44, duration: 0.72, ease: "power1.out" }, 0.14)
        .to(".intro-fog", { scale: 1.22, opacity: 0.06, duration: 4.15, ease: "power1.inOut", force3D: false }, 0.15)
        .to(".intro-light", { opacity: 0.42, scale: 1.38, duration: 3.8, ease: "sine.inOut", force3D: false }, 0.18)
        .to(".hero-landscape", { scale: 1.015, xPercent: 0, yPercent: 0, duration: 4.45, ease: "power3.out", force3D: true }, 0.18)
        .to(".intro-middle--left", { scale: 1.26, xPercent: -82, yPercent: -3, duration: 3.75, ease: "power2.in", force3D: false }, 0.28)
        .to(".intro-middle--right", { scale: 1.28, xPercent: 84, yPercent: -2, duration: 3.8, ease: "power2.in", force3D: false }, 0.28)
        .to(".intro-near--left", { scale: 1.4, xPercent: -112, yPercent: 4, duration: 3.25, ease: "power2.in", force3D: false }, 0.52)
        .to(".intro-near--right", { scale: 1.42, xPercent: 114, yPercent: -3, duration: 3.3, ease: "power2.in", force3D: false }, 0.52)
        .to(".intro-foreground-leaves", { scale: 1.52, xPercent: -20, yPercent: 9, duration: 2.55, ease: "power2.in", force3D: false }, 0.58)
        .to(".intro-foreground-leaves", { autoAlpha: 0, duration: 2.15, ease: "power1.in" }, 1.0)
        .to(".intro-vignette", { opacity: 0, duration: 1.3, ease: "power1.inOut" }, 1.9)
        .to(".intro-near--left", { autoAlpha: 0, duration: 1.05, ease: "power1.inOut" }, 2.5)
        .to(".intro-near--right", { autoAlpha: 0, duration: 1.05, ease: "power1.inOut" }, 2.66)
        .to(".intro-middle--left", { autoAlpha: 0, duration: 0.92, ease: "power1.inOut" }, 3.0)
        .to(".intro-middle--right", { autoAlpha: 0, duration: 0.92, ease: "power1.inOut" }, 3.14)
        .fromTo(".hero-environment", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.72, ease: "power1.out" }, 3.76)
        .fromTo(".site-nav", { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.46, ease: "power2.out" }, 4.0)
        .fromTo(".hero-eyebrow", { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.04)
        .to(".intro-fog, .intro-light", { opacity: 0, duration: 0.52, ease: "power1.out" }, 4.28)
        .set(scene, { autoAlpha: 0 }, 4.88);

      heroMotionTracks().forEach(({ selector, from, introAt, introDuration }) => {
        timeline.fromTo(selector, from, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: introDuration, ease: "power3.out", force3D: true }, introAt);
      });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipIntro();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKeyDown);
      introTimeline.current?.kill();
      introTimeline.current = null;
      document.documentElement.classList.remove("intro-lock");
    };
  }, [finalizeIntro, skipIntro]);

  useEffect(() => {
    const saved = window.localStorage.getItem("zpp-language");
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    const frame = window.requestAnimationFrame(() => {
      if (saved === "zh" || saved === "en") setLang(saved);
      update();
    });
    query.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      query.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("zpp-language", lang);
  }, [lang]);

  useEffect(() => {
    if (!reducedMotion || introPhase === "done") return;
    const frame = window.requestAnimationFrame(skipIntro);
    return () => window.cancelAnimationFrame(frame);
  }, [introPhase, reducedMotion, skipIntro]);

  useEffect(() => {
    if (introPhase !== "done" || reducedMotion || !root.current) return;
    const scope = root.current;
    const flights = Array.from(scope.querySelectorAll<HTMLElement>(".bird-flight"));
    const timers = new Set<number>();
    const listeners = new Map<HTMLElement, (event: AnimationEvent) => void>();
    let disposed = false;

    const schedule = (flight: HTMLElement, index: number, first = false) => {
      if (disposed) return;
      const near = flight.classList.contains("bird-flight--near");
      const minimum = near ? 12000 : 4500;
      const spread = near ? 17000 : 11000;
      const delay = first ? (near ? 8500 : 2200 + index * 2600) : minimum + Math.random() * spread;
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        if (disposed) return;
        if (document.hidden) {
          schedule(flight, index);
          return;
        }

        const fromRight = Math.random() > (near ? 0.7 : 0.55);
        flight.classList.toggle("bird-flight--from-right", fromRight);
        flight.style.setProperty("--bird-top", `${near ? 16 + Math.random() * 20 : 20 + Math.random() * 24}%`);
        flight.style.setProperty("--bird-arc", `${(Math.random() * 2 - 1) * (near ? 7 : 4)}vh`);
        flight.style.setProperty("--bird-duration", `${near ? 5.2 + Math.random() * 2.1 : 18 + Math.random() * 8}s`);
        flight.classList.remove("is-flying");
        window.requestAnimationFrame(() => !disposed && flight.classList.add("is-flying"));
      }, delay);
      timers.add(timer);
    };

    const onVisibilityChange = () => {
      scope.classList.toggle("is-page-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();

    flights.forEach((flight, index) => {
      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.target !== flight) return;
        flight.classList.remove("is-flying");
        schedule(flight, index);
      };
      listeners.set(flight, onAnimationEnd);
      flight.addEventListener("animationend", onAnimationEnd);
      schedule(flight, index, true);
    });

    return () => {
      disposed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      listeners.forEach((listener, flight) => flight.removeEventListener("animationend", listener));
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scope.classList.remove("is-page-hidden");
    };
  }, [introPhase, reducedMotion]);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    const context = gsap.context(() => {
      const nav = document.querySelector(".site-nav");
      ScrollTrigger.create({
        trigger: ".about",
        start: "top 85%",
        endTrigger: ".contact",
        end: "bottom bottom",
        toggleClass: { targets: nav!, className: "site-nav--solid" },
      });

      ["hero", "about", "experience", "capabilities", "ai-lab", "contact"].forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(id),
        });
      });

      if (reducedMotion) return;

      gsap.set(
        ".hero-sculpture, .hero-polyhedron, .hero-landscape, .about-art-bust, .about-object, .about-foliage, .about-landscape, .interlude-layer, .observation-landscape, .observation-sculpture, .observation-ring-system, .observation-polyhedron-flight, .observation-polyhedron, .experience-art--indoor, .experience-outdoor, .experience-indoor-copy, .experience-statue, .art-fly, .tool-track",
        { force3D: true },
      );

      gsap.utils.toArray<HTMLElement>(".about-line").forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 58, opacity: 0.18 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: line, start: "top 88%", end: "top 50%", scrub: 0.14 },
          },
        );
      });

      const aboutArtTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".about", start: "top 58%", end: "bottom 4%", scrub: 0.12 },
      });
      aboutArtTimeline
        .to(".about-art-bust", { xPercent: -148, yPercent: -126, rotate: -10, opacity: 0, ease: "none" }, 0)
        .to(".about-butterfly--one", { xPercent: 520, yPercent: -340, rotate: 42, opacity: 0, ease: "none" }, 0.04)
        .to(".about-butterfly--two", { xPercent: 410, yPercent: -460, rotate: -28, opacity: 0, ease: "none" }, 0.08)
        .to(".about-butterfly--three", { xPercent: 330, yPercent: -310, rotate: 64, opacity: 0, ease: "none" }, 0.12)
        .to(".about-magnifier--one", { xPercent: 690, yPercent: -390, rotate: 85, opacity: 0, ease: "none" }, 0.02)
        .to(".about-magnifier--two", { xPercent: 360, yPercent: -470, rotate: -105, opacity: 0, ease: "none" }, 0.07)
        .to(".about-magnifier--three", { xPercent: 260, yPercent: -350, rotate: 116, opacity: 0, ease: "none" }, 0.1)
        .fromTo(".about-foliage--left", { rotate: -2, xPercent: -2 }, { rotate: 3, xPercent: 1, duration: 0.18, ease: "sine.inOut" }, 0)
        .to(".about-foliage--left", { rotate: -1, xPercent: -1, duration: 0.18, ease: "sine.inOut" }, 0.18)
        .to(".about-foliage--left", { rotate: 4, xPercent: 1.5, yPercent: -5, duration: 0.24, ease: "sine.inOut" }, 0.36)
        .fromTo(".about-foliage--right", { rotate: 2, xPercent: 2 }, { rotate: -3, xPercent: -1, duration: 0.18, ease: "sine.inOut" }, 0)
        .to(".about-foliage--right", { rotate: 1, xPercent: 1, duration: 0.18, ease: "sine.inOut" }, 0.18)
        .to(".about-foliage--right", { rotate: -4, xPercent: -1.5, yPercent: -4, duration: 0.24, ease: "sine.inOut" }, 0.36)
        .to(".about-landscape", { scale: 1.08, yPercent: -3, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>(".art-interlude").forEach((interlude) => {
        if (interlude.classList.contains("art-interlude--observation")) {
          const observationTimeline = gsap.timeline({
            scrollTrigger: { trigger: interlude, start: "top 92%", end: "bottom 8%", scrub: 0.12 },
          });
          observationTimeline
            .fromTo(".observation-polyhedron-flight", { xPercent: -88, yPercent: -365, scale: 1.08 }, { xPercent: 0, yPercent: 0, scale: 0.86, duration: 0.58, ease: "power1.in" }, 0)
            .fromTo(".observation-polyhedron", { rotate: -82 }, { rotate: 224, duration: 0.58, ease: "none" }, 0)
            .fromTo(".observation-polyhedron-shadow", { scaleX: 0.22, opacity: 0 }, { scaleX: 1, opacity: 0.5, duration: 0.16, ease: "none" }, 0.42)
            .to(".observation-sculpture", { xPercent: 3, yPercent: 88, rotate: -10, opacity: 0, transformOrigin: "70% 82%", duration: 0.62, ease: "none" }, 0.17)
            .to(".observation-ring-system", { yPercent: 46, opacity: 0, duration: 0.52, ease: "none" }, 0.24)
            .fromTo(".observation-landscape", { scale: 1.01 }, { scale: 1.055, yPercent: -2, duration: 1, ease: "none" }, 0)
            .fromTo(interlude.querySelectorAll(".interlude-copy, .interlude-script"), { yPercent: 8 }, { yPercent: -8, duration: 1, ease: "none" }, 0);
          return;
        }
        const layers = interlude.querySelectorAll(".interlude-layer");
        const timeline = gsap.timeline({ scrollTrigger: { trigger: interlude, start: "top bottom", end: "bottom top", scrub: 0.12 } });
        layers.forEach((layer, index) => {
          timeline.fromTo(layer, { yPercent: index % 2 ? 16 : -12, rotate: index % 3 === 0 ? -2 : 2 }, { yPercent: index % 2 ? -15 : 11, rotate: index % 3 === 0 ? 2 : -2, ease: "none" }, 0);
        });
      });

      gsap.utils.toArray<HTMLElement>(".paper-wave").forEach((wave) => {
        gsap.fromTo(wave, { yPercent: 10, rotate: -3 }, {
          yPercent: -9,
          rotate: 1.5,
          ease: "none",
          scrollTrigger: { trigger: wave, start: "top bottom", end: "bottom top", scrub: 0.12 },
        });
      });

      const metrics = gsap.utils.toArray<HTMLElement>(".metric");
      const expTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".experience-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          pin: ".experience-stage",
          anticipatePin: 1,
        },
      });

      metrics.forEach((metric, index) => {
        const position = 0.84 + index * 0.07;
        expTimeline
          .fromTo(metric, { autoAlpha: 0, yPercent: 34, scale: 0.9 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.035, ease: "none" }, position)
          .to(metric, { autoAlpha: 0, yPercent: -28, scale: 1.04, duration: 0.035, ease: "none" }, position + 0.05);
      });

      expTimeline
        .fromTo(".experience-statue", { xPercent: () => window.innerWidth <= 640 ? -100 : -150, yPercent: 5, opacity: 1 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.34, ease: "none" }, 0.02)
        .fromTo(".experience-art--indoor", { scale: 1 }, { scale: 5.8, duration: 0.52, ease: "none" }, 0.3)
        .fromTo(".experience-indoor-copy", { scale: 1, autoAlpha: 1 }, { scale: 5.8, autoAlpha: 0, duration: 0.42, ease: "none" }, 0.3)
        .fromTo(".experience-outdoor", { scale: 1 }, { scale: 1.34, duration: 0.52, ease: "none" }, 0.3)
        .fromTo(".experience-finale", { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, 1.16);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(element, { y: 70, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.68,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".art-fly").forEach((element, index) => {
        const direction = index % 3;
        gsap.fromTo(element,
          { xPercent: direction === 0 ? -75 : direction === 1 ? 70 : -20, yPercent: direction === 2 ? 55 : 20, rotate: direction === 0 ? -16 : 14, opacity: 0 },
          { xPercent: direction === 0 ? 24 : direction === 1 ? -18 : 16, yPercent: direction === 2 ? -28 : -18, rotate: direction === 0 ? 8 : -6, opacity: 1, ease: "none", scrollTrigger: { trigger: element.closest("section") ?? element, start: "top 88%", end: "bottom 18%", scrub: 0.12 } },
        );
      });

      gsap.utils.toArray<HTMLElement>(".tool-track").forEach((track, index) => {
        gsap.fromTo(track, { xPercent: index % 2 ? -9 : 9 }, {
          xPercent: index % 2 ? 8 : -8,
          ease: "none",
          scrollTrigger: { trigger: ".tools", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lang, reducedMotion]);

  useEffect(() => {
    if (introPhase !== "done" || reducedMotion || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.14,
          pin: ".hero-stage",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroMotionTracks().forEach(({ selector, from, scrollAt, scrollDuration }) => {
        heroTimeline.to(selector, { ...from, duration: scrollDuration, ease: "none", force3D: true }, scrollAt);
      });

      heroTimeline
        .to(".hero-landscape", { scale: 1.08, yPercent: -3, ease: "none", force3D: true }, 0)
        .fromTo(".about-portal", { yPercent: 112, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "none" }, 0.46)
        .to(".hero-atmosphere", { opacity: 1, ease: "none" }, 0.22);
    }, root);

    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(frame);
      context.revert();
    };
  }, [introPhase, lang, reducedMotion]);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (reducedMotion) target.scrollIntoView({ behavior: "auto", block: "start" });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main ref={root} className="portfolio" data-language={lang} data-intro={introPhase}>
      <a className="skip-link" href="#about">Skip to content</a>

      {introPhase !== "done" && (
        <div className="intro-scene" aria-label={lang === "zh" ? "森林穿越入场动画" : "Forest fly-through intro"}>
          <div className="intro-fog" aria-hidden="true" />
          <div className="intro-light" aria-hidden="true" />
          <Image unoptimized priority className="intro-layer intro-middle intro-middle--left" src="/media/hero/intro/forest-middle-left.webp" alt="" fill sizes="100vw" />
          <Image unoptimized priority className="intro-layer intro-middle intro-middle--right" src="/media/hero/intro/forest-middle-right.webp" alt="" fill sizes="100vw" />
          <Image unoptimized priority className="intro-layer intro-near intro-near--left" src="/media/hero/intro/forest-near-left.webp" alt="" fill sizes="100vw" />
          <Image unoptimized priority className="intro-layer intro-near intro-near--right" src="/media/hero/intro/forest-near-right.webp" alt="" fill sizes="100vw" />
          <Image unoptimized priority className="intro-layer intro-foreground-leaves" src="/media/hero/intro/forest-foreground-leaves.webp" alt="" fill sizes="100vw" />
          <div className="intro-vignette" aria-hidden="true" />
          <button className="intro-skip" type="button" onClick={skipIntro}>
            {lang === "zh" ? "跳过" : "Skip"}<span aria-hidden="true">↗</span>
          </button>
        </div>
      )}

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#hero" onClick={(event) => scrollTo(event, "hero")} aria-label="ZPP home">
          <span>Z</span><span>PP</span>
        </a>
        <div className="nav-links">
          {content.nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={(event) => scrollTo(event, id)}>
              {label}
            </a>
          ))}
        </div>
        <button className="language-toggle" onClick={() => setLang(lang === "zh" ? "en" : "zh")} aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}>
          <span className={lang === "zh" ? "selected" : ""}>中</span><i />
          <span className={lang === "en" ? "selected" : ""}>EN</span>
        </button>
      </nav>

      <section id="hero" className="hero-scroll" aria-labelledby="hero-title">
        <div className="hero-stage">
          <div className="hero-atmosphere" />
          <div className="hero-art">
            <Image unoptimized className="hero-landscape" src="/media/hero/intro/hero-homepage-clean.webp" alt="古典油画风格的湖泊、山谷与云层风景" fill priority sizes="100vw" />
            <div className="hero-sky-motion" aria-hidden="true">
              <i className="hero-sky-haze" />
              <i className="hero-lake-shimmer" />
              <div className="environment-dust">
                {Array.from({ length: 9 }, (_, index) => <i key={index} style={{ "--dust-index": index } as React.CSSProperties} />)}
              </div>
              <span className="bird-flight bird-flight--far bird-flight--far-one"><Bird flock /></span>
              <span className="bird-flight bird-flight--far bird-flight--far-two"><Bird flock /></span>
              <span className="bird-flight bird-flight--near"><Bird /></span>
            </div>
            <div className="hero-sculpture">
              <div className="hero-orbits" aria-hidden="true">
                <i className="hero-orbit hero-orbit--one" />
                <i className="hero-orbit hero-orbit--two" />
                <i className="hero-orbit hero-orbit--three" />
              </div>
              <Image unoptimized className="hero-bust" src="/media/hero/hero-bust.webp" alt="古典石膏头像" width={844} height={1486} priority sizes="(max-width: 640px) 78vw, 43vw" />
            </div>
            <Image unoptimized className="hero-polyhedron hero-polyhedron--large" src="/media/hero/hero-polyhedron-1.webp" alt="" aria-hidden="true" width={362} height={400} priority />
            <Image unoptimized className="hero-polyhedron hero-polyhedron--small" src="/media/hero/hero-polyhedron-2.webp" alt="" aria-hidden="true" width={135} height={131} priority />
            <Image unoptimized className="hero-polyhedron hero-polyhedron--pyramid" src="/media/hero/hero-polyhedron-3.webp" alt="" aria-hidden="true" width={326} height={310} priority />
          </div>
          <div className="hero-environment" aria-hidden="true">
            <Image unoptimized className="hero-branch hero-branch--left-base" src="/media/hero/intro/branch-top-left-base.webp" alt="" fill sizes="100vw" />
            <Image unoptimized className="hero-branch hero-branch--left-a" src="/media/hero/intro/branch-top-left-leaves-a.webp" alt="" fill sizes="100vw" />
            <Image unoptimized className="hero-branch hero-branch--left-b" src="/media/hero/intro/branch-top-left-leaves-b.webp" alt="" fill sizes="100vw" />
            <Image unoptimized className="hero-branch hero-branch--right-base" src="/media/hero/intro/branch-top-right-base.webp" alt="" fill sizes="100vw" />
            <Image unoptimized className="hero-branch hero-branch--right-a" src="/media/hero/intro/branch-top-right-leaves-a.webp" alt="" fill sizes="100vw" />
            <Image unoptimized className="hero-branch hero-branch--right-b" src="/media/hero/intro/branch-top-right-leaves-b.webp" alt="" fill sizes="100vw" />
          </div>
          <div className="hero-eyebrow"><span>PORTFOLIO / 2026</span><span>{content.hero.eyebrow}</span></div>
          <div className="hero-titles" id="hero-title">
            <h1 className="hero-name hero-name--cn">{content.hero.name}</h1>
            <p className="hero-name hero-name--en">{content.hero.latinName}</p>
          </div>
          <div className="hero-copy">
            <p className="hero-statement">{content.hero.statement}</p>
            <span className="hero-tags">{content.hero.tags}</span>
          </div>
          <a className="explore" href="#about" onClick={(event) => scrollTo(event, "about")}>
            <span>{content.hero.explore}</span><Arrow />
          </a>
          <div className="about-portal" aria-hidden="true">
            <span>Logic</span><b>meets</b><span>Art</span><b>through</b><span>AI</span>
          </div>
        </div>
      </section>

      <section id="about" className="about section-shell" aria-labelledby="about-heading">
        <div className="about-art" aria-hidden="true">
          <Image unoptimized className="about-landscape" src="/media/about/about-landscape.webp" alt="" fill sizes="100vw" />
          <Image unoptimized className="about-art-bust" src="/media/about/about-bust.webp" alt="" width={810} height={1419} sizes="(max-width: 640px) 62vw, 34vw" />
          <Image unoptimized className="about-object about-butterfly about-butterfly--one" src="/media/about/about-butterfly-1.webp" alt="" width={249} height={244} />
          <Image unoptimized className="about-object about-butterfly about-butterfly--two" src="/media/about/about-butterfly-2.webp" alt="" width={307} height={280} />
          <Image unoptimized className="about-object about-butterfly about-butterfly--three" src="/media/about/about-butterfly-3.webp" alt="" width={205} height={208} />
          <Image unoptimized className="about-object about-magnifier about-magnifier--one" src="/media/about/about-magnifier-1.webp" alt="" width={147} height={147} />
          <Image unoptimized className="about-object about-magnifier about-magnifier--two" src="/media/about/about-magnifier-2.webp" alt="" width={250} height={228} />
          <Image unoptimized className="about-object about-magnifier about-magnifier--three" src="/media/about/about-magnifier-3.webp" alt="" width={343} height={253} />
          <Image unoptimized className="about-foliage about-foliage--left" src="/media/about/about-foliage-left.webp" alt="" width={800} height={611} sizes="44vw" />
          <Image unoptimized className="about-foliage about-foliage--right" src="/media/about/about-foliage-right.webp" alt="" width={825} height={558} sizes="42vw" />
        </div>
        <div className="section-label"><span>{content.about.label}</span><span>{content.about.title}</span></div>
        <div className="about-orbit" aria-hidden="true"><span>LOGIC</span><span>ART</span><span>AI</span></div>
        <div className="about-lines" id="about-heading">
          {content.about.lines.map((line, index) => <h2 key={line} className={`about-line about-line--${index + 1}`}>{line}</h2>)}
        </div>
        <div className="about-grid reveal">
          <p className="about-intro">{content.about.intro}</p>
          <div className="about-detail">
            <p>{content.about.traits}</p>
            <dl>
              {content.about.education.map((item, index) => <div key={item}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{item}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <ArtInterlude index="I" variant="painting" title={content.interludes[0][0]} note={content.interludes[0][1]} />

      <section id="experience" className="experience-scroll" aria-labelledby="experience-heading">
        <div className="experience-stage">
          <div className="experience-outdoor" aria-hidden="true">
            <Image unoptimized priority className="experience-outdoor-landscape" src="/media/experience/experience-outdoor-landscape.webp" alt="" fill sizes="100vw" />
          </div>
          <div className="experience-art experience-art--indoor" aria-hidden="true">
            <Image unoptimized priority className="experience-indoor-foreground" src="/media/experience/experience-indoor-foreground.png" alt="" fill sizes="100vw" />
            <Image unoptimized priority className="experience-statue" src="/media/experience/experience-statue-v2.webp" alt="" width={536} height={1419} sizes="(max-width: 640px) 42vw, 24vw" />
            <Image unoptimized priority className="experience-column-foreground" src="/media/experience/experience-column-foreground.webp" alt="" fill sizes="100vw" />
          </div>
          <div className="experience-indoor-copy">
            <div className="experience-topline"><span>{content.experience.label}</span><span>{content.experience.date}</span></div>
            <div className="experience-title-block">
              <p>{content.experience.role}</p>
              <h2 id="experience-heading">{content.experience.title}</h2>
            </div>
          </div>
          <div className="metrics" aria-label="Key metrics">
            {content.experience.metrics.map(([value, label], index) => (
              <div className={`metric metric-${index + 1}`} key={value}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <div className="experience-media" aria-label="Media placeholders">
            {content.experience.media.map((label, index) => (
              <figure className={`media-plate media-${String.fromCharCode(97 + index)}`} key={label}>
                <div className="media-visual"><span>0{index + 1}</span><i /></div><figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="experience-finale">
            <div className="process-loop">{content.experience.process.map((step, index) => <span key={step}>{step}{index < content.experience.process.length - 1 && <i>→</i>}</span>)}</div>
            <p>{content.experience.summary}</p>
          </div>
          <div className="scroll-progress" aria-hidden="true"><i /></div>
        </div>
      </section>

      <ArtInterlude index="II" variant="sculpture" title={content.interludes[1][0]} note={content.interludes[1][1]} />

      <section id="capabilities" className="capabilities section-shell" aria-labelledby="capabilities-heading">
        <Image unoptimized className="section-art section-art--cap-hand art-fly" src="/media/art/plaster-hand.webp" alt="" width={1577} height={997} sizes="50vw" />
        <span className="paint-orbit paint-orbit--a art-fly" aria-hidden="true" /><span className="paint-orbit paint-orbit--b art-fly" aria-hidden="true" />
        <div className="section-label"><span>{content.capabilities.label}</span><span>EVIDENCE, NOT ADJECTIVES</span></div>
        <h2 id="capabilities-heading" className="editorial-heading reveal">{content.capabilities.title}</h2>
        <div className="capability-list">
          {content.capabilities.items.map((item, index) => (
            <article className={`capability capability-${index + 1} reveal`} key={item.title}>
              <span className="cap-index">0{index + 1}</span><p className="cap-kicker">{item.kicker}</p><h3>{item.title}</h3><p className="cap-body">{item.body}</p><div className="cap-signal" aria-hidden="true"><i /><i /><i /><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="ai-lab" className="lab section-shell" aria-labelledby="lab-heading">
        <div className="lab-art-window art-fly" aria-hidden="true"><Image unoptimized src="/media/art/twilight-painting-warm.webp" alt="" fill sizes="42vw" /></div>
        <Image unoptimized className="section-art section-art--lab-bust art-fly" src="/media/art/plaster-bust.webp" alt="" width={1024} height={1536} sizes="30vw" />
        <div className="section-label"><span>{content.lab.label}</span><span>CO-CREATED WITH CODEX</span></div>
        <div className="lab-heading-wrap reveal"><h2 id="lab-heading">{content.lab.title}</h2><p>{content.lab.status}</p></div>
        <div className="lab-list">
          {content.lab.items.map(([number, title, body, status]) => (
            <article className="lab-item reveal" key={number}>
              <span className="lab-number">{number}</span><div><h3>{title}</h3><p>{body}</p></div><span className="lab-status">{status}</span><Arrow diagonal />
            </article>
          ))}
        </div>
      </section>

      <section className="tools" aria-labelledby="tools-heading">
        <Image unoptimized className="tools-hand art-fly" src="/media/art/plaster-hand.webp" alt="" width={1577} height={997} sizes="58vw" />
        <div className="section-shell tools-head">
          <div className="section-label"><span>{content.tools.label}</span><span>WORKING CONSTELLATION</span></div>
          <h2 id="tools-heading" className="editorial-heading reveal">{content.tools.title}</h2><p className="reveal">{content.tools.note}</p>
        </div>
        <div className="tool-orbits">
          {content.tools.groups.map(([group, tools]) => (
            <div className="tool-row" key={group}><span className="tool-group">{group}</span><div className="tool-track">{[...tools, ...tools].map((tool, toolIndex) => <span key={`${tool}-${toolIndex}`}>{tool}<i>✦</i></span>)}</div></div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section-shell" aria-labelledby="contact-heading">
        <div className="contact-glow" aria-hidden="true" />
        <div className="section-label"><span>{content.contact.label}</span><span>OPEN CHANNEL</span></div>
        <h2 id="contact-heading" className="reveal">{content.contact.title}</h2>
        <p className="contact-statement reveal">{content.contact.statement}</p>
        <div className="contact-grid reveal">
          <a className="contact-card contact-email" href={`mailto:${contactPlaceholders.email}`}><span>01 / {content.contact.email}</span><strong>{contactPlaceholders.email}</strong><Arrow diagonal /></a>
          <a className="contact-card social-card" href={contactPlaceholders.douyin} target="_blank" rel="noreferrer"><div className="social-placeholder"><span>DY</span><i>{content.contact.placeholder}</i></div><p>02 / {content.contact.douyin}</p><strong>DOUYIN ↗</strong></a>
          <a className="contact-card social-card" href={contactPlaceholders.xiaohongshu} target="_blank" rel="noreferrer"><div className="social-placeholder social-placeholder--red"><span>RED</span><i>{content.contact.placeholder}</i></div><p>03 / {content.contact.xiaohongshu}</p><strong>XIAOHONGSHU ↗</strong></a>
          <div className="contact-card resume-card" aria-label={content.contact.resume}><span>04 / PDF</span><strong>{content.contact.resume}</strong><em>COMING SOON</em></div>
        </div>
        <footer><span>{content.footer}</span><a href="#hero" onClick={(event) => scrollTo(event, "hero")}>BACK TO TOP ↑</a></footer>
      </section>
    </main>
  );
}

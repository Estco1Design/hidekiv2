"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useI18n } from "@/i18n/I18nProvider";

export function BrandIntro() {
  const { language } = useI18n();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("loading");
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const count = useTransform(progress, (value) =>
    String(Math.round(value)).padStart(3, "0"),
  );
  const scale = useTransform(progress, (value) => value / 100);
  function close() {
    setVisible(false);
    try {
      sessionStorage.setItem("hideki-intro-v2", "seen");
    } catch {}
  }
  function click() {
    const context = audio.current;
    if (!sound || !context) return;
    const buffer = context.createBuffer(
      1,
      context.sampleRate * 0.07,
      context.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++)
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 350);
    const source = context.createBufferSource();
    const gain = context.createGain();
    gain.gain.value = 0.15;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(context.destination);
    source.start();
    source.onended = () => {
      void context.close();
      audio.current = null;
    };
  }
  function toggleSound() {
    if (!sound) {
      try {
        audio.current ??= new AudioContext();
        void audio.current.resume();
      } catch {
        return;
      }
    }
    setSound((value) => !value);
  }
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("hideki-intro-v2") === "seen";
    } catch {}
    if (seen || reduced || window.location.pathname !== "/") return;
    setVisible(true);
    const controls = animate(progress, 100, {
      duration: 1.6,
      ease: "easeInOut",
      onComplete: () => setPhase("orbit"),
    });
    const timer = window.setTimeout(() => setPhase("shutter"), 2700);
    const end = window.setTimeout(close, 3400);
    return () => {
      controls.stop();
      window.clearTimeout(timer);
      window.clearTimeout(end);
    };
  }, [reduced, progress]);
  useEffect(() => {
    if (phase === "shutter") click();
  }, [phase]); // sound is explicitly enabled by the viewer
  useEffect(() => {
    if (!visible) return;
    const main = document.getElementById("main-content");
    const nav = document.querySelector("nav");
    main?.setAttribute("inert", "");
    nav?.setAttribute("inert", "");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlay.current?.querySelector("button")?.focus({ preventScroll: true });
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const buttons =
          overlay.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      main?.removeAttribute("inert");
      nav?.removeAttribute("inert");
      document.body.style.overflow = previous;
      if (audio.current) {
        void audio.current.close();
        audio.current = null;
      }
      window.removeEventListener("keydown", escape);
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div
      ref={overlay}
      role="dialog"
      aria-modal="true"
      className={`brand-intro intro-phase-${phase}`}
      aria-label={
        language === "ru" ? "Вступление HIDEKI" : "HIDEKI introduction"
      }
    >
      <div className="intro-top">
        <span>HIDEKI / Visual experience</span>
        <button onClick={close}>
          {language === "ru" ? "Пропустить" : "Skip"}
        </button>
      </div>
      <div className="intro-word">
        HIDEKI
        <div className="intro-orbit" />
        <div className="intro-orbit second" />
      </div>
      <div className="intro-bottom">
        <span>
          {language === "ru" ? "Открываем пространство" : "Opening the space"}
        </span>
        <motion.span>{count}</motion.span>
        <span>/ 100</span>
        <button aria-pressed={sound} onClick={toggleSound}>
          {language === "ru"
            ? `Звук ${sound ? "вкл" : "выкл"}`
            : `Sound ${sound ? "on" : "off"}`}
        </button>
      </div>
      <motion.div className="intro-progress" style={{ scaleX: scale }} />
      <div className="shutter-top" />
      <div className="shutter-bottom" />
    </div>
  );
}

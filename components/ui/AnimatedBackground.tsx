"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = resolvedTheme === "dark";

    if (isDark) {
      // ── Dark: particle network ──
      const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(96,165,250,${0.12 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(96,165,250,0.45)";
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        animationId = requestAnimationFrame(draw);
      };
      draw();

    } else {
      // ── Light: topology map with animated dashed lines ──
      const nodes: { x: number; y: number; type: "router" | "switch" | "host" }[] = [];
      const cols = Math.ceil(canvas.width / 180);
      const rows = Math.ceil(canvas.height / 160);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const types: ("router" | "switch" | "host")[] = ["router", "switch", "host"];
          nodes.push({
            x: c * 180 + 90 + (Math.random() - 0.5) * 60,
            y: r * 160 + 80 + (Math.random() - 0.5) * 60,
            type: types[Math.floor(Math.random() * types.length)],
          });
        }
      }

      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) edges.push([i, j]);
        }
      }

      const drawNode = (x: number, y: number, type: string) => {
        ctx.save();
        ctx.translate(x, y);

        if (type === "router") {
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(37,99,235,0.6)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = "rgba(219,234,254,0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
          ctx.moveTo(0, -4); ctx.lineTo(0, 4);
          ctx.strokeStyle = "rgba(37,99,235,0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (type === "switch") {
          ctx.beginPath();
          ctx.roundRect(-8, -5, 16, 10, 2);
          ctx.strokeStyle = "rgba(37,99,235,0.6)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = "rgba(219,234,254,0.9)";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147,197,253,0.9)";
          ctx.fill();
        }

        ctx.restore();
      };

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.setLineDash([4, 8]);
          ctx.lineDashOffset = -frame * 0.3;
          ctx.strokeStyle = "rgba(37,99,235,0.35)";
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        nodes.forEach((n) => drawNode(n.x, n.y, n.type));

        animationId = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
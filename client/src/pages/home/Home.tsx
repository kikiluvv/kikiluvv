import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './home.css';

type Bubble = {
    id: number;
    left: string;
    size: string;
    duration: number;
    delay: number;
    color: string;
    spinDirection: 1 | -1;
    spinDuration: number;
    pulseDuration: number;
};

function calculateShadowDirection(tiltX: number, tiltY: number) {
    const angle = Math.atan2(tiltY, tiltX);
    const distance = Math.sqrt(tiltX * tiltX + tiltY * tiltY);

    return {
        x: Math.cos(angle) * distance * 0.5,
        y: Math.sin(angle) * distance * 0.5,
        intensity: Math.min(0.5, distance / 10)
    };
}

export default function Home() {
    const [shadow, setShadow] = useState({ x: 0, y: 0, intensity: 0 });
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const globalMouseHandler = useRef<((e: MouseEvent) => void) | null>(null);

    useEffect(() => {
        globalMouseHandler.current = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            const cards = document.querySelectorAll<HTMLElement>('.home-container');
            cards.forEach(card => {
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        };

        window.addEventListener('mousemove', globalMouseHandler.current);
        return () => {
            if (globalMouseHandler.current) {
                window.removeEventListener('mousemove', globalMouseHandler.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = e.clientX - centerX;
            const offsetY = e.clientY - centerY;

            const maxTilt = 4;
            const tiltX = (offsetY / (rect.height / 2)) * maxTilt;
            const tiltY = -(offsetX / (rect.width / 2)) * maxTilt;

            const shadow = calculateShadowDirection(tiltX, tiltY);
            setShadow(shadow);

            setTilt({ x: tiltX, y: tiltY });
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);



    useEffect(() => {
        let bubbleId = 0;
        const spawnInterval = setInterval(() => {
            const newBubble: Bubble = {
                id: bubbleId++,
                left: `${Math.random() * 100}%`,
                size: `${10 + Math.random() * 20}px`,
                duration: 10 + Math.random() * 20,
                delay: 0,
                color:
                    Math.random() < 0.5
                        ? "rgba(127, 90, 240, 0.3)"
                        : "rgba(240, 127, 180, 0.2)",
                spinDirection: Math.random() < 0.5 ? 1 : -1,
                spinDuration: 4 + Math.random() * 8,
                pulseDuration: 3 + Math.random() * 4,
            };
            setBubbles((prev) => [...prev, newBubble]);
        }, 300);

        return () => clearInterval(spawnInterval);
    }, []);

    function handleAnimationEnd(id: number) {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
    }

    return (
        <section className="home-wrapper">
            <div className="bubble-background" aria-hidden="true">
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        className="bubble-wrapper"
                        style={{
                            left: bubble.left,
                            width: bubble.size,
                            height: bubble.size,
                            animationDuration: `${bubble.duration}s`,
                            animationDelay: `${bubble.delay}s`,
                        }}
                        onAnimationEnd={() => handleAnimationEnd(bubble.id)}
                    >
                        <div
                            className="bubble"
                            style={{
                                backgroundColor: bubble.color,
                                animationDuration: `${bubble.spinDuration}s, ${bubble.pulseDuration}s`,
                                animationDirection: bubble.spinDirection === 1 ? "normal" : "reverse",
                            }}
                        />
                    </div>
                ))}
            </div>

            <div
                ref={containerRef}
                className="home-container"
                style={{
                    "--mouse-x": `${mousePos.x}%`,
                    "--mouse-y": `${mousePos.y}%`,
                    "--tilt-x": `${tilt.x}deg`,
                    "--tilt-y": `${tilt.y}deg`,
                    "--shadow-offset-x": `${-tilt.y * 0.5}px`,
                    "--shadow-offset-y": `${tilt.x * 0.5}px`,
                    "--shadow-blur": `${15 + Math.abs(tilt.x + tilt.y) * 2}px`,
                    "--shadow-spread": `${Math.abs(tilt.x + tilt.y) * 0.5}px`,
                    "--shadow-opacity": `${Math.min(0.4, (Math.abs(tilt.x) + Math.abs(tilt.y)) / 15)}`,
                    transform: `translate(-50%, -50%) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))`,
                    boxShadow: `
    ${shadow.x}px ${shadow.y}px 
    ${15 + shadow.intensity * 20}px 
    ${shadow.intensity * 5}px 
    rgba(0, 0, 0, ${shadow.intensity}),
    0 30px 60px rgba(0, 0, 0, 0.35),
    0 0 60px rgba(127, 90, 240, 0.07),
    inset ${tilt.y}px ${-tilt.x}px 12px rgba(255, 255, 255, 0.05)
`
                } as React.CSSProperties}
            >
                <div
                    className="glass-refraction"
                    style={{
                        transform: `rotateX(${tilt.x * 0.3}deg) rotateY(${tilt.y * 0.3}deg)`,
                        background: `linear-gradient(${Math.atan2(tilt.y, tilt.x) * (180 / Math.PI) + 45
                            }deg, 
                            transparent 10%,
                            rgba(255, 255, 255, 0.1) 30%,
                            rgba(255, 255, 255, 0.4) 50%,
                            rgba(255, 255, 255, 0.1) 70%,
                            transparent 90%)`,
                        opacity: Math.min(0.7, (Math.abs(tilt.x) + Math.abs(tilt.y)) / 10)
                    }}
                />

                {/* 🔮 Added edge shadow for depth */}
                <div
                    className="glass-edge-shadow"
                    style={{
                        opacity: Math.min(0.5, Math.abs(tilt.x + tilt.y) / 15),
                        transform: `translate(${tilt.y * 2}px, ${-tilt.x * 2}px)`,
                        background: `linear-gradient(
                            to ${tilt.y > 0 ? 'left' : 'right'},
                            rgba(0, 0, 0, 0.25),
                            transparent 60%
                        )`
                    }}
                />

                <h1 className="glitch-title" data-text="kiki.dev">
                    kiki.dev
                </h1>

                <p className="intro">
                    website <br />
                    poopy pants
                </p>

                <div className="link-grid">
                    <Link to="/software" className="link-card">🧩 software</Link>
                    <Link to="/archive" className="link-card">📜 archive</Link>
                    <a href="/api/files/resume.pdf" download className="link-card">⬇️ download pdf</a>
                </div>
            </div>
        </section>
    );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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

export default function Home() {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
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
                className="home-container"
                style={{
                    "--mouse-x": `${mousePos.x}%`,
                    "--mouse-y": `${mousePos.y}%`,
                    "--gloss-opacity": isHovering ? 0.8 : 0.5,
                    "--liquid-intensity": isHovering ? 1.05 : 1,
                } as React.CSSProperties}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="shimmer-overlay"></div>
                <h1 className="glitch-title" data-text="ihateyoue.dev">
                    ihateyoue.dev
                </h1>

                <p className="intro">
                    welcome to the shrine of my work. <br />
                    here lies code, design, and digital dreams stitched together.
                </p>

                <div className="link-grid">
                    <Link to="/software" className="link-card">
                        🧩 software
                    </Link>
                    <Link to="/resume" className="link-card">
                        📜 resume
                    </Link>
                    <a href="/api/files/resume.pdf" download className="link-card">
                        ⬇️ download pdf
                    </a>
                </div>
            </div>
        </section>
    );
}
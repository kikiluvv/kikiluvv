import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

type ArchiveItem = {
    id: number;
    title: string;
};

const itemCount = 20;
const speed = 0.5;

export default function ParallaxColumns() {
    // Refs for columns and scroll container
    const leftColRef = useRef<HTMLDivElement>(null);
    const middleColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // States for fetched data and item height
    const [leftItems, setLeftItems] = useState<ArchiveItem[]>([]);
    const [middleItems, setMiddleItems] = useState<ArchiveItem[]>([]);
    const [rightItems, setRightItems] = useState<ArchiveItem[]>([]);
    const [itemHeight, setItemHeight] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Fetch data from each column endpoint
    useEffect(() => {
        async function fetchColumnData() {
            try {
                const [leftRes, middleRes, rightRes] = await Promise.all([
                    fetch("https://ihateyoue.onrender.com/api/archive/left-column"),
                    fetch("https://ihateyoue.onrender.com/api/archive/middle-column"),
                    fetch("https://ihateyoue.onrender.com/api/archive/right-column"),
                ]);
                console.log('Left Res: ', leftRes, ' Mid Res: ', middleRes, ' Right Res: ', rightRes)
                if (!leftRes.ok || !middleRes.ok || !rightRes.ok) {
                    throw new Error("Failed to fetch columns");
                }
                const leftData: ArchiveItem[] = await leftRes.json();
                const middleData: ArchiveItem[] = await middleRes.json();
                const rightData: ArchiveItem[] = await rightRes.json();

                // Limit the number of items to itemCount or less
                setLeftItems(leftData.slice(0, itemCount));
                setMiddleItems(middleData.slice(0, itemCount));
                setRightItems(rightData.slice(0, itemCount));
            } catch (error) {
                console.error("Error loading columns:", error);
            }
        }

        fetchColumnData();
    }, []);

    // Measure item height once we have items loaded and refs ready
    useEffect(() => {
        if (!middleColRef.current) return;
        if (middleItems.length === 0) return;

        const firstItem = middleColRef.current.querySelector(".column-item") as HTMLElement | null;
        if (firstItem) {
            const height = firstItem.clientHeight * middleItems.length;
            setItemHeight(height);
            setIsReady(true);
        }
    }, [middleItems]);

    // Setup LocomotiveScroll and parallax transforms
    useEffect(() => {
        if (!scrollRef.current || !itemHeight || !isReady) return;

        const locoScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            getDirection: true,
        });

        locoScroll.on("scroll", (args) => {
            const scrollY = args.scroll.y;
            const offset = scrollY * speed;
            const wrappedOffset = offset % itemHeight;

            const upPosition = -wrappedOffset;
            const downPosition = wrappedOffset;

            // Helper to apply transform safely
            const applyTransform = (ref: React.RefObject<HTMLDivElement>, pos: number) => {
                if (!ref.current) return;
                const content = ref.current.querySelector(".column-content") as HTMLElement | null;
                if (content) content.style.transform = `translateY(${pos}px)`;
            };

            applyTransform(leftColRef as React.RefObject<HTMLDivElement>, upPosition);
            applyTransform(middleColRef as React.RefObject<HTMLDivElement>, downPosition);
            applyTransform(rightColRef as React.RefObject<HTMLDivElement>, upPosition);

            if (titleRef.current) {
                const visibleThreshold = 200;
                const fadeRange = 300;
                const translateMultiplier = 0.3;

                const translateY = Math.min(scrollY * translateMultiplier, visibleThreshold + fadeRange);

                titleRef.current.style.transform = `translateY(-${translateY}px)`;



                if (scrollY < visibleThreshold) {
                    titleRef.current.style.opacity = "1";
                } else {
                    const fadeProgress = Math.min((scrollY - visibleThreshold) / fadeRange, 1);
                    titleRef.current.style.opacity = `${1 - fadeProgress}`;
                }
            }
        });

        return () => {
            locoScroll.destroy();
        };
    }, [itemHeight, isReady]);

    const styles = {
        fixedWrapper: {
            position: "fixed" as const,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            overflow: "hidden",
            backgroundColor: "black",
        },
        column: {
            flex: 1,
            width: "100%",
            overflow: "hidden",
            position: "relative" as const,
            WebkitBackfaceVisibility: "hidden" as const,
            backfaceVisibility: "hidden" as const,
        },
        columnContent: {
            willChange: "transform" as const,
            height: "100%",
            width: "100%",
            position: "absolute" as const,
            top: 0,
        },
        columnItem: {
            height: "40vh",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none" as const,
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            fontWeight: 300,
        },
        scrollContainer: {
            position: "relative" as const,
            paddingTop: "100vh",
            height: "1700vh",
        },
        title: {
            position: "fixed" as const,
            top: 0,
            left: "0",               // move left edge to center of viewport
            width: "100vw",             // let width fit content (or max-content)
            height: "120vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
            textAlign: "center" as const,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
            willChange: "transform, opacity",
            pointerEvents: "none" as "none",
        },        
    };

    // For seamless infinite loop, duplicate the data arrays
    const leftItemsDouble = [...leftItems, ...leftItems];
    const middleItemsDouble = [...middleItems, ...middleItems];
    const rightItemsDouble = [...rightItems, ...rightItems];

    // Calculate content height for seamless looping
    const contentHeight = isReady ? itemHeight * 2 : "auto";

    return (
        <>
            <div className="archive-wrapper" style={styles.fixedWrapper}>
                <div className="archive-title" style={{
                    ...styles.title,
                    transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
                }}
                    ref={titleRef}>
                    archive
                </div>

                {/* Left Column */}
                <div className="archive-column" ref={leftColRef} style={styles.column}>
                    <div
                        className="column-content"
                        style={{ ...styles.columnContent, height: contentHeight, top: 0 }}
                    >
                        {leftItemsDouble.map((item, i) => (
                            <div
                                key={`left-${item.id}-${i}`}
                                className="column-item"
                                style={{
                                    ...styles.columnItem,
                                    background: i % 2 === 0 ? "rgba(30, 50, 80, 0.4)" : "rgba(30, 50, 80, 0.6)",
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle Column */}
                <div className="archive-column" ref={middleColRef} style={styles.column}>
                    <div
                        className="column-content"
                        style={{ ...styles.columnContent, height: contentHeight, top: -itemHeight }}
                    >
                        {middleItemsDouble.map((item, i) => (
                            <div
                                key={`middle-${item.id}-${i}`}
                                className="column-item"
                                style={{
                                    ...styles.columnItem,
                                    background: i % 2 === 0 ? "rgba(50, 30, 80, 0.4)" : "rgba(50, 30, 80, 0.6)",
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="archive-column" ref={rightColRef} style={styles.column}>
                    <div
                        className="column-content"
                        style={{ ...styles.columnContent, height: contentHeight, top: 0 }}
                    >
                        {rightItemsDouble.map((item, i) => (
                            <div
                                key={`right-${item.id}-${i}`}
                                className="column-item"
                                style={{
                                    ...styles.columnItem,
                                    background: i % 2 === 0 ? "rgba(80, 30, 50, 0.4)" : "rgba(80, 30, 50, 0.6)",
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The scroll container for locomotive-scroll */}
            <div ref={scrollRef} style={styles.scrollContainer}>
                {/* Tall content to allow scrolling */}
                <div style={{ height: "300vh" }} />
            </div>
        </>
    );
}

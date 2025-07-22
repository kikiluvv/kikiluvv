import React, { useRef, useState, useEffect } from 'react';
import './liquidbutton.css'; 

interface LiquidButtonProps {
    children?: React.ReactNode;  // Made optional with ?
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }

const LiquidButton: React.FC<LiquidButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className = ''
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [borderRadii, setBorderRadii] = useState({
        tl: 12, tr: 12, bl: 12, br: 12
    });
    const [isHovering, setIsHovering] = useState(false);
    const turbulenceRef1 = useRef<SVGFETurbulenceElement>(null);
    const turbulenceRef2 = useRef<SVGFETurbulenceElement>(null);
    const animationRef = useRef<number>(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const animateTurbulence = () => {
            timeRef.current += 0.01;

            if (turbulenceRef1.current) {
                const freq1 = 0.01 + 0.005 * Math.sin(timeRef.current * 0.8);
                const freq2 = 0.02 + 0.005 * Math.cos(timeRef.current * 0.6);
                turbulenceRef1.current.setAttribute('baseFrequency', `${freq1} ${freq2}`);
            }

            if (turbulenceRef2.current) {
                const freq1 = 0.03 + 0.015 * Math.sin(timeRef.current);
                const freq2 = 0.04 + 0.015 * Math.cos(timeRef.current * 1.2);
                turbulenceRef2.current.setAttribute('baseFrequency', `${freq1} ${freq2}`);
            }

            animationRef.current = requestAnimationFrame(animateTurbulence);
        };

        animationRef.current = requestAnimationFrame(animateTurbulence);

        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const calculateBorderRadii = (x: number, y: number) => {
        const baseRadius = 12;
        const verticalWarp = Math.abs(y - 50) / 50;
        const horizontalWarp = Math.abs(x - 50) / 50;

        const warpAmount = 0.8 + verticalWarp * 0.8;
        const HORIZONTAL_WARP_CAP = 0.5;
        const HORIZONTAL_BASE = 0.1;
        const HORIZONTAL_MULTIPLIER = 0.1;
        const horizontalWarpAmount = HORIZONTAL_BASE + (Math.min(horizontalWarp, HORIZONTAL_WARP_CAP) * HORIZONTAL_MULTIPLIER);

        return {
            tl: baseRadius + (y < 50 ? warpAmount : 0) + (x < 50 ? horizontalWarpAmount : 0),
            tr: baseRadius + (y < 50 ? warpAmount : 0) + (x > 50 ? horizontalWarpAmount : 0),
            bl: baseRadius + (y > 50 ? warpAmount : 0) + (x < 50 ? horizontalWarpAmount : 0),
            br: baseRadius + (y > 50 ? warpAmount : 0) + (x > 50 ? horizontalWarpAmount : 0)
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const LEFT_EDGE_BUFFER = 20;
        const RIGHT_EDGE_BUFFER = 20;
        const rippleX = Math.max(LEFT_EDGE_BUFFER, Math.min(100 - RIGHT_EDGE_BUFFER, (x / rect.width) * 100));

        const TOP_EDGE_BUFFER = 5;
        const BOTTOM_EDGE_BUFFER = 5;
        const rippleY = Math.max(TOP_EDGE_BUFFER, Math.min(100 - BOTTOM_EDGE_BUFFER, (y / rect.height) * 100));

        const posX = parseFloat(rippleX.toFixed(2));
        const posY = parseFloat(rippleY.toFixed(2));

        setMousePosition({ x: posX, y: posY });
        setBorderRadii(calculateBorderRadii(posX, posY));
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({ x: 50, y: 50 });
        setBorderRadii({ tl: 12, tr: 12, bl: 12, br: 12 });
    };

    return (
        <>
            <button
                ref={buttonRef}
                type={type}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`liquid-button ${isHovering ? 'liquid-active' : ''} ${className}`}
                style={{
                    '--mouse-x': `${mousePosition.x}%`,
                    '--mouse-y': `${mousePosition.y}%`,
                    '--border-tl': `${borderRadii.tl}px`,
                    '--border-tr': `${borderRadii.tr}px`,
                    '--border-bl': `${borderRadii.bl}px`,
                    '--border-br': `${borderRadii.br}px`,
                } as React.CSSProperties}
            >
                <span className="button-text"
                    style={{
                        filter: `brightness(${isHovering ? 2 : 1})`,
                        transition: 'filter 0.3s ease'
                    }}
                >
                    {children}
                </span>
                <span className="liquid-overlay"></span>
                <span className="refraction-layer layer-1"></span>
                <span className="refraction-layer layer-2"></span>
                <span className="refraction-layer layer-3"></span>

                {/* Magnifying Glass Bubble */}
                <span
                    className="ios26-bubble"
                    style={{
                        top: `${mousePosition.y}%`,
                        left: `${mousePosition.x}%`,
                        opacity: isHovering ? 0.8 : 0,
                    }}
                />

                {/* Glass Underlay for Magnification */}
                <div
                    className="glass-underlay"
                    style={{
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                        opacity: isHovering ? 1 : 0,
                        clipPath: `circle(60px at ${mousePosition.x}% ${mousePosition.y}%)`,
                    }}
                ></div>
            </button>

            {/* SVG Filters */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    {/* Glass Gooey Effect Filter */}
                    <filter id="glass">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -8" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>

                    {/* Liquid Distortion Filter */}
                    <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            ref={turbulenceRef1}
                            type="fractalNoise"
                            baseFrequency="0.01 0.02"
                            numOctaves="3"
                            result="turbulence"
                            seed="53"
                        />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>

                    {/* Stronger Distortion for Magnifying Effect */}
                    <filter id="magnify-distortion" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence
                            ref={turbulenceRef2}
                            type="fractalNoise"
                            baseFrequency="0.03 0.04"
                            numOctaves="4"
                            result="turbulence"
                            seed="53"
                        />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G" />
                        <feGaussianBlur stdDeviation="1.5" />
                    </filter>

                    {/* Fisheye Magnification Filter */}
                    <filter id="fisheye">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
                        <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated" />
                        <feSpecularLighting result="specular" lightingColor="white" surfaceScale="6" specularConstant="1.2" specularExponent="20">
                            <fePointLight x="0" y="0" z="150" />
                        </feSpecularLighting>
                        <feComposite in="saturated" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                    </filter>
                </defs>
            </svg>
        </>
    );
};

export default LiquidButton;
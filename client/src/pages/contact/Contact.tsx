import LiquidButton from '../../components/liquidButton/LiquidButton';
import { useRef } from 'react';
import './contact.css';

const Contact: React.FC = () => {
    const shimmerRef = useRef<HTMLFormElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: React.MouseEvent) {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const rect = overlay.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        overlay.style.setProperty('--x', `${xPercent}%`);
        overlay.style.setProperty('--y', `${yPercent}%`);
    }



    return (
        <div className="contact-overlay" ref={overlayRef} onMouseMove={handleMouseMove}>
            <div className="contact-wrapper shimmer-border"
            >
                <h1 className="glitch-title" data-text="contact">contact</h1>
                <form
                    className="contact-form"
                    action="mailto:your@email.com"
                    method="POST"
                    encType="text/plain"
                    ref={shimmerRef}
                >
                    <div className="gooey-container">
                        <input
                            type="text"
                            name="name"
                            placeholder="your name"
                            required
                            className="contact-input shimmer-border"
                        />
                    </div>

                    <div className="gooey-container">
                        <input
                            type="email"
                            name="email"
                            placeholder="your email"
                            required
                            className="contact-input shimmer-border"
                        />
                    </div>

                    <div className="gooey-container">
                        <textarea
                            name="message"
                            placeholder="your message"
                            required
                            className="contact-textarea shimmer-border"
                            rows={4}
                        />
                    </div>
                    <div className="gooey-container">
                        <LiquidButton>
                            send
                        </LiquidButton>
                    </div>
                </form>
                <p className="contact-footer">appeal2heaven</p>
            </div>
        </div>
    );
};

export default Contact;
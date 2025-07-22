import LiquidButton from '../../components/liquidButton/LiquidButton';
import './contact.css';

const Contact: React.FC = () => {

    return (
        <div className="contact-wrapper">
            <h1 className="glitch-title" data-text="contact">contact</h1>
            <form
                className="contact-form"
                action="mailto:your@email.com"
                method="POST"
                encType="text/plain"
            >
                <div className="gooey-container">
                    <input
                        type="text"
                        name="name"
                        placeholder="your name"
                        required
                        className="contact-input"
                    />
                </div>

                <div className="gooey-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="your email"
                        required
                        className="contact-input"
                    />
                </div>

                <div className="gooey-container">
                    <textarea
                        name="message"
                        placeholder="your message"
                        required
                        className="contact-textarea"
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
    );
};

export default Contact;
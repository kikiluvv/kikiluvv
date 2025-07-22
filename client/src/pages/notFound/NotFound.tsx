import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="notfound-wrapper">
            <div className="scanlines" />
            <div className="glitch-container">
                <h1 className="glitch" data-text="404">404</h1>
                <p className="ghost-text">this page is lost in the static</p>
                <a href="/" className="back-link">return to reality</a>
            </div>
        </div>
    );
}

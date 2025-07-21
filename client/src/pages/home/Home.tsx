import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <section className="home-container">
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
                <a
                    href="/api/files/resume.pdf"
                    download
                    className="link-card"
                >
                    ⬇️ download pdf
                </a>
            </div>
        </section>
    )
}

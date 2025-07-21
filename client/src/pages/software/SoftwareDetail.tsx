import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './softwareDetail.css';

import flstudio from '../../assets/software/flstudio.jpg';
import serum from '../../assets/software/serum.png';

type Software = {
    id: number;
    title: string;
    description: string;
    bio: string;
    tech: string[];
    image: string;
    link: string;
};

const photos: Record<string, string> = {
    flstudio,
    serum
};

export default function SoftwareDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [software, setSoftware] = useState<Software | null>(null);

    useEffect(() => {
        fetch(`/api/software/${id}`)
            .then(res => res.json())
            .then(setSoftware)
            .catch(console.error);
    }, [id]);

    if (!software) return <div className="software-detail-loading">Loading...</div>;

    function closeModal() {
        // go back to software list (parent route)
        navigate('/software');
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                    ×
                </button>
                <div className="modal-image-container">
                    <img
                        src={photos[software.image] || software.image}
                        alt={software.title}
                        className="detail-image"
                    />
                </div>
                <div className="detail-info">
                    <h1>{software.title}</h1>
                    <p>{software.description}</p>
                    <ul className="tech-list">
                        {software.tech.map(t => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                    <a
                        href={software.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link"
                    >
                        Open in GitHub ↗
                    </a>
                </div>
            </div>
        </div>
    );
}

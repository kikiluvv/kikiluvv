import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './kitsDetail.css';

import flstudio from '../../assets/software/flstudio.jpg';
import serum from '../../assets/software/serum.png';

type kits = {
    id: number;
    title: string;
    description: string;
    bio: string;
    price: number;
    tech: string[];
    image: string;
    link: string;
};

const photos: Record<string, string> = {
    flstudio,
    serum
};

export default function KitsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kits, setkits] = useState<kits | null>(null);

    useEffect(() => {
        fetch(`/api/kits/${id}`)
            .then(res => res.json())
            .then(setkits)
            .catch(console.error);
    }, [id]);

    if (!kits) return <div className="kits-detail-loading">Loading...</div>;

    function closeModal() {
        // go back to kits list (parent route)
        navigate('/kits');
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                    ×
                </button>
                <div className="modal-image-container">
                    <img
                        src={photos[kits.image] || kits.image}
                        alt={kits.title}
                        className="detail-image"
                    />
                </div>
                <div className="detail-info">
                    <h1>{kits.title}</h1>
                    <p className='kits-modal-desc'>{kits.description}</p>
                    <p className='kits-modal-price'>${kits.price}</p>
                    <ul className="tech-list">
                        {kits.tech.map(t => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                    <a
                        href={kits.link}
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

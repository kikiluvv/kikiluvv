import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './softwareDetail.css';

import flstudio from '../../assets/software/flstudio.jpg';
import serum from '../../assets/software/serum.png';
import fabfilter from '../../assets/software/fabfilter.webp';
import ep1 from '../../assets/software/ep1.png';
import freshair from '../../assets/software/freshair.webp';
import dune3 from '../../assets/software/dune3.jpg';
import autotune from '../../assets/software/autotune.webp';
import autokey from '../../assets/software/autokey.webp'
import spire from '../../assets/software/spire.webp';
import purity from '../../assets/software/purity.jpg';
import rx11 from '../../assets/software/rx11.png';
import omnisphere from '../../assets/software/omnisphere.jpeg';
import miku from '../../assets/software/miku.jpg';
import halftime from '../../assets/software/halftime.png';

type Software = {
    id: number;
    title: string;
    description: string;
    bio: string;
    tech: string[];
    image: string;
    link: string;
    version: string;
    fileSize: string;
    fileType: string;
    available: boolean;
};

const photos: Record<string, string> = {
    flstudio,
    serum,
    fabfilter,
    ep1,
    freshair,
    dune3,
    autotune,
    autokey,
    spire,
    purity,
    rx11,
    omnisphere,
    miku,
    halftime
};

function handleDownload(id: number, title: string, fileType: string) {
    fetch(`http://localhost:5000/api/software/download/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Download failed.');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.${fileType}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.error(err);
            alert('Failed to download file. Server said no.');
        });
}

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
        navigate('/software');
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                    ×
                </button>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img
                            src={photos[software.image] || software.image}
                            alt={software.title}
                            className="detail-image"
                        />
                        <div className="file-meta">
                            <span>{software.version}</span>
                            <span>•</span>
                            <span>{software.fileSize} • {software.title}.{software.fileType}</span>
                        </div>
                    </div>
                    <div className="detail-info">
                        <h1>{software.title}</h1>
                        <p className="detail-description">{software.description}</p>
                        <ul className="tech-list">
                            {software.tech.map(t => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                        <button
                            className={`download-btn ${!software.available ? 'disabled' : ''}`}
                            onClick={() =>
                                software.available &&
                                handleDownload(software.id, software.title, software.fileType)
                            }
                            disabled={!software.available}
                        >
                            ⬇ Download
                        </button>

                        {!software.available && (
                            <p className="unavailable-msg">This software is currently unavailable for download.</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

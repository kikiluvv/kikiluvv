import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
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
import analoglab from '../../assets/software/analoglab.jpg';

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
    slug: string;
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
    halftime,
    analoglab
};

/*
function handleDownload(id: number, title: string, fileType: string) {
    fetch(`https://ihateyoue.onrender.com/api/software/download/${id}`)
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
*/

export default function SoftwareDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [software, setSoftware] = useState<Software | null>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    function handleDownload(id: number, title: string, fileType: string) {
        setDownloading(true);
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
            })
            .finally(() => {
                setDownloading(false);
            });
    }

    function isLargeFile(sizeStr: string): boolean {
        // Extract numeric value and unit
        const match = sizeStr.toLowerCase().match(/^([\d.]+)\s*(gb|mb|kb)$/);
        if (!match) return false;

        const [, value, unit] = match;
        const size = parseFloat(value);

        switch (unit) {
            case 'gb':
                return size > 2;
            case 'mb':
                return size > 2048; // 2GB in MB
            case 'kb':
                return size > 2 * 1024 * 1024; // 2GB in KB
            default:
                return false;
        }
    }

    function handleMouseMove(e: React.MouseEvent) {
        const shimmer = shimmerRef.current;
        if (!shimmer) return;

        const rect = shimmer.getBoundingClientRect();

        // Calculate position relative to the modal content
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Clamp the values to stay within the modal bounds
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));

        // Convert to percentage for smoother edge effects
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        shimmer.style.setProperty('--x', `${xPercent}%`);
        shimmer.style.setProperty('--y', `${yPercent}%`);
    }

    /*
    useEffect(() => {
        fetch(`https://ihateyoue.onrender.com/api/software/${id}`)
            .then(res => res.json())
            .then(setSoftware)
            .catch(console.error);
    }, [id]);
    */

    useEffect(() => {
        fetch(`http://localhost:5000/api/software/${id}`)
            .then(res => res.json())
            .then(setSoftware)
            .catch(console.error);
    }, [id]);

    if (!software) return <div className="software-detail-loading">Loading...</div>;

    function closeModal() {
        navigate('/software');
    }

    return (
        <div
            className="modal-overlay"
            ref={overlayRef}
            onMouseMove={handleMouseMove}
            onClick={closeModal}
        >
            <div
                className="modal-content shimmer-border"
                ref={shimmerRef}
                onClick={(e) => e.stopPropagation()}
            >
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
                            <div className="file-meta-container">
                    
                                <span>
                                    {software.version} • {software.slug}.{software.fileType} • {software.fileSize}
                                </span>
                            </div>
                            <div className="file-meta-container">
                                {isLargeFile(software.fileSize) && (
                                    <span className="file-warning">• Larger files may take longer to download </span>
                                )}
                            </div>
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
                            className={`download-btn ${!software.available || downloading ? 'disabled' : ''}`}
                            onClick={() =>
                                software.available && !downloading &&
                                handleDownload(software.id, software.title, software.fileType)
                            }
                            disabled={!software.available || downloading}
                        >
                            {downloading ? (
                                <div className="spinner"></div>
                            ) : (
                                `⬇ Download • ${software.fileSize}`
                            )}
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

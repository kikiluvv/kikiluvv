import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './software.css';

import flstudio from '../../assets/software/flstudio.jpg';
import serum from '../../assets/software/serum.png';
import fabfilter from '../../assets/software/fabfilter.webp';
import ep1 from '../../assets/software/ep1.png';
import freshair from '../../assets/software/freshair.webp';
import dune3 from '../../assets/software/dune3.jpg';
import autotune from '../../assets/software/autotune.webp';
import autokey from '../../assets/software/autokey.webp';
import spire from '../../assets/software/spire.webp';
import purity from '../../assets/software/purity.jpg';
import rx11 from '../../assets/software/rx11.png';
import omnisphere from '../../assets/software/omnisphere.jpeg';
import miku from '../../assets/software/miku.jpg';
import halftime from '../../assets/software/halftime.png';

type Software = {
    id: number;
    title: string;
    bio: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
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

export default function Software() {
    const [softwares, setSoftwares] = useState<Software[]>([]);
    const [filterTech, setFilterTech] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const globalMouseHandler = useRef<((e: MouseEvent) => void) | null>(null);

    useEffect(() => {
        fetch('https://ihateyoue.onrender.com/api/software')
            .then(res => res.json())
            .then(setSoftwares)
            .catch(console.error);
    }, []);

    useEffect(() => {
        globalMouseHandler.current = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            const cards = document.querySelectorAll<HTMLElement>('.software-card');
            cards.forEach(card => {
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        };

        window.addEventListener('mousemove', globalMouseHandler.current);
        return () => {
            if (globalMouseHandler.current) {
                window.removeEventListener('mousemove', globalMouseHandler.current);
            }
        };
    }, []);

    const allTechTags = useMemo(() => {
        const tags = new Set<string>();
        softwares.forEach(s => s.tech.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [softwares]);

    const filteredSoftwares = useMemo(() => {
        let filtered = softwares;
        if (filterTech !== 'all') {
            filtered = filtered.filter(s => s.tech.includes(filterTech));
        }

        return filtered.sort((a, b) => {
            if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
            if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [softwares, filterTech, sortOrder]);

    return (
        <>
            <main className="softwares-container">
                <h1>software</h1>

                <div className="filter-sort-controls">
                    <label>
                        Filter by Tech:{' '}
                        <select value={filterTech} onChange={e => setFilterTech(e.target.value)}>
                            <option value="all">All</option>
                            {allTechTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Sort by Title:{' '}
                        <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                        </select>
                    </label>
                </div>

                <hr className='software-hr' />

                <section className="software-grid">
                    {filteredSoftwares.map(p => (
                        <Link key={p.id} to={`/software/${p.id}`} className="software-card-link">
                            <article className="software-card">
                                <img
                                    src={photos[p.image] || p.image}
                                    alt={p.title}
                                    className="software-image"
                                />
                                <div className="software-content">
                                    <h2>{p.title}</h2>
                                    <p>{p.bio}</p>
                                    <ul className="tech-stack">
                                        {p.tech.map(t => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </Link>
                    ))}
                </section>

                <hr className='software-hr' />
            </main>
            <Outlet />
        </>
    );
}

import { useEffect, useState, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './kits.css';

import flstudio from '../../assets/software/flstudio.jpg';
import serum from '../../assets/software/serum.png';

type Kits = {
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
    serum
};

export default function Kits() {
    const [kits, setKits] = useState<Kits[]>([]);
    const [filterTech, setFilterTech] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetch('/api/kits')
            .then(res => res.json())
            .then(setKits)
            .catch(console.error);
    }, []);

    // get unique tech tags across all software items
    const allTechTags = useMemo(() => {
        const tags = new Set<string>();
        kits.forEach(s => s.tech.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [kits]);

    // filtered + sorted software list
    const filteredKits = useMemo(() => {
        let filtered = kits;
        if (filterTech !== 'all') {
            filtered = filtered.filter(s => s.tech.includes(filterTech));
        }

        filtered = filtered.sort((a, b) => {
            if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
            if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [kits, filterTech, sortOrder]);

    return (
        <>
            <main className="kits-container">
                <h1>kits</h1>

                <div className="filter-sort-controls">
                    <label>
                        Filter by Tech:{' '}
                        <select value={filterTech} onChange={e => setFilterTech(e.target.value)}>
                            <option value="all">All</option>
                            {allTechTags.map(tag => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
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
                <hr className='kits-hr' />
                <section className="kits-grid">
                    {filteredKits.map(p => (
                        <article key={p.id} className="kits-card">
                            <img src={photos[p.image] || p.image} alt={p.title} className="kits-image" />
                            <div className="kits-content">
                                <h2>{p.title}</h2>
                                <p>{p.bio}</p>
                                <ul className="tech-stack">
                                    {p.tech.map(t => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>
                                <Link to={`/kits/${p.id}`}>View Code</Link>
                            </div>
                        </article>
                    ))}
                </section>
                <hr className='kits-hr' />
            </main>

            <Outlet />
        </>
    );
}

import express from 'express';
const router = express.Router();

const archive = [
    {
        id: 1,
        title: "deezClicks",
        description: "Lightweight JavaScript auto-clicker via CLI.",
        image: "/images/memory-leak.png"
    },
    {
        id: 2,
        title: "deezNodes",
        description: "Lightweight JavaScript library for building Express apps.",
        image: "/images/echobox.png"
    },
    {
        id: 3,
        title: "Butler",
        description: "Tomorrow's home server, serving stillborn packets and soft promise.",
        image: "/images/butler.png"
    },
    {
        id: 4,
        title: "EchoBox",
        description: "Lightweight, self-hosted media server with a clean UI.",
        image: "/images/specter.png"
    },
    {
        id: 5,
        title: "KYS",
        description: "Kill Your Self - Node-based CLI for generating and injecting ransomware payloads",
        image: "/images/hollowcast.png"
    },
    {
        id: 6,
        title: "Gone Phishin'",
        description: "OG appeal2heaven toolkit built by scammers, for scammers",
        image: "/images/noirdrive.png"
    },
    {
        id: 7,
        title: "ISY",
        description: "I See You - CLI app for creating and managing doxxing profiles",
        image: "/images/noirdrive.png"
    },
    {
        id: 8,
        title: "DNR",
        description: "Do Not Redeem - Node based trolling toolkit",
        image: "/images/noirdrive.png"
    },
    {
        id: 9,
        title: "Total Drama",
        description: "Advanced keylogging profile generator and manager.",
        image: "/images/noirdrive.png"
    },
    {
        id: 10,
        title: "NoirDrive",
        description: "Encrypted NAS with a mood. Sleek, but brooding.",
        image: "/images/noirdrive.png"
    },
    {
        id: 11,
        title: "NoirDrive",
        description: "Encrypted NAS with a mood. Sleek, but brooding.",
        image: "/images/noirdrive.png"
    },
    {
        id: 12,
        title: "NoirDrive",
        description: "Encrypted NAS with a mood. Sleek, but brooding.",
        image: "/images/noirdrive.png"
    }
];

// utility to split items round-robin
function splitIntoColumns<T>(items: T[], numCols: number): T[][] {
    const columns: T[][] = Array.from({ length: numCols }, () => []);
    items.forEach((item, index) => {
        columns[index % numCols].push(item);
    });
    return columns;
}

router.get('/left-column', (_, res) => {
    const [left] = splitIntoColumns(archive, 3);
    res.json(left);
});

router.get('/middle-column', (_, res) => {
    const [, middle] = splitIntoColumns(archive, 3);
    res.json(middle);
});

router.get('/right-column', (_, res) => {
    const [, , right] = splitIntoColumns(archive, 3);
    res.json(right);
});

export default router;

import express from 'express';
const router = express.Router();

const softwares = [
    {
        id: 1,
        title: "GonePhishin",
        bio: "Modular CLI Malware toolkit.",
        description: "Contact directly for details...",
        tech: ["Node.js", "Bash", "Shell"],
        image: "flstudio",
        link: "https://github.com/youruser/gonephishin"
    },
    {
        id: 1,
        title: "GonePhishin",
        description: "Modular CLI malware analysis toolkit.",
        tech: ["Node.js", "Inquirer", "MongoDB"],
        image: "flstudio",
        link: "https://github.com/youruser/gonephishin"
    },
    {
        id: 3,
        title: "FL Studio 20",
        bio: "Image-Line Fruity Loops 20 DAW - Producer Edition.",
        description: "Team AIR Crack",
        tech: ["Audio", "Mac", "Image-Line"],
        image: "flstudio",
        link: "https://github.com/youruser/gonephishin"
    },
    {
        id: 4,
        title: "Serum",
        description: "Xfer Records Serum VST Synthesizer",
        tech: ["Audio", "Mac", "VST", "Xfer"],
        image: "serum",
        link: "https://github.com/youruser/gonephishin"
    },
];

router.get('/', (_, res) => {
    res.json(softwares);
});

// Get a single project by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const software = softwares.find(p => p.id === id);

    if (!software) {
        return res.status(404).json({ message: 'Software not found' });
    }

    res.json(software);
});

export default router;

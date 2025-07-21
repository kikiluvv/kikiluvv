import express from 'express';
const router = express.Router();

const kits = [
    {
        id: 1,
        title: "a2h 2025",
        bio: "Offical appeal2heaven drum kit 2025",
        description: "Brand new 2025 offical appeal2heaven drum kit, made by 1kikiluvv. 300+ high-quality samples, 10+ loops, and 5+ .flp's",
        price: 30,
        tech: ["Node.js", "Bash", "Shell"],
        image: "flstudio",
        link: "https://github.com/youruser/gonephishin"
    }
];

router.get('/', (_, res) => {
    res.json(kits);
});

// Get a single project by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const kit = kits.find(p => p.id === id);

    if (!kit) {
        return res.status(404).json({ message: 'Kit not found' });
    }

    res.json(kit);
});

export default router;

import express from 'express';
import path from 'path';
import fs from 'fs';
const router = express.Router();

const softwares = [
    {
        id: 1,
        title: "KYS",
        bio: "Encryption paylod generator and injector.",
        description: "Contact directly for details...",
        tech: ["Node.js", "Bash", "Shell"],
        image: "kys",
        fileType: "zip",
        version: "v1.0.0",
        fileSize: "5.3MB",
        available: true
    },
    {
        id: 2,
        title: "GonePhishin",
        bio: "Modular CLI malware analysis toolkit.",
        description: "Contact directly for details...",
        tech: ["Node.js", "Bash", "MongoDB"],
        image: "gonephishin",
        fileType: "zip",
        version: "v1.0.0",
        fileSize: "4.2MB",
        available: false
    },
    {
        id: 3,
        title: "FL Studio 20",
        bio: "FL Studio 20 Producer Edition.",
        description: "FL Studio is a complete software music production environment or Digital Audio Workstation made by Image-Line. Producer Edition includes essential features like recording vocals, exporting tracks, and importing audio files, which are not available in the entry-level Fruity Edition. It also includes features not present in the Fruity Edition, such as Edison and NewTone audio editors",
        tech: ["Audio", "Mac", "Image-Line"],
        image: "flstudio",
        fileType: "zip",
        version: "v1.0.0",
        fileSize: "743MB",
        available: true
    },
    {
        id: 4,
        title: "Serum",
        bio: "Xfer Records Serum VST Synthesizer",
        description: "A wavetable synthesizer with a truly high-quality sound, visual and creative workflow-oriented interface to make creating and altering sounds fun",
        tech: ["Audio", "Mac", "VST", "Xfer"],
        image: "serum",
        fileType: "zip",
        version: "v1.0.0",
        fileSize: "323MB",
        available: true
    },
    {
        id: 5,
        title: "FabFilter Bundle",
        bio: "FabFilter Total VST Bundle",
        description: "The Total Bundle is a set of all FabFilter plug-ins. With this bundle, you get our professional EQ, reverb, compressor, multiband dynamics, limiter, de-esser and gate/expander, creative multiband distortion, delay, filter and synthesizer plug-ins.",
        tech: ["Audio", "Mac", "VST", "FabFilter"],
        image: "fabfilter",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 6,
        title: "EP-1",
        bio: "KORG EP-1 VST",
        description: "EP-1 by KORG superbly reproduces the sound of seven classic tine-type, reed-type electric pianos, and vintage effects with high precision.",
        tech: ["Audio", "Mac", "VST", "KORG"],
        image: "ep1",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 7,
        title: "DUNE 3",
        bio: "Synapse Audio DUNE 3 VST Synthesizer",
        description: "DUNE 3 by Synapse Audio provides the highest sound quality and allows to create the whole range of sounds. New double filter, powerful wavetable editor and all the new effects.",
        tech: ["Audio", "Mac", "VST", "Synapse"],
        image: "dune3",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 8,
        title: "HalfTime",
        bio: "Cableguys HalfTime FX VST",
        description: "HalfTime is a one-click transformation of any audio into a downtempo, dark version of itself, giving your beats/track a huge atmosphere and mood change.",
        tech: ["Audio", "Mac", "VST", "Cableguys"],
        image: "halftime",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 9,
        title: "RX11",
        bio: "iZotope RX11 VST",
        description: "RX 11 is the award-winning audio cleanup software trusted by top post production engineers to quickly remove background noise and restore damaged audio.",
        tech: ["Audio", "Mac", "VST", "iZotope"],
        image: "rx11",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 10,
        title: "Auto-Tune Artist",
        bio: "Antares Auto-Tune Artist VST",
        description: "Get industry-leading pitch correction with AutoTune Artist by Antares. Real-time tracking, live performance optimization, and advanced vocal effects.",
        tech: ["Audio", "Mac", "VST", "Antares"],
        image: "autotune",
        version: 'v9.2.0',
        fileSize: '589mb',
        fileType: 'zip',
        slug: 'Auto-Tune_Artist_v9.2.0',
        available: true
    },
    {
        id: 11,
        title: "Fresh Air",
        bio: "Slate Digital Fresh Air VST",
        description: "Add smooth, crisp top end to your vocals, beats, samples & even full mixes in seconds without a single ounce of harshness.",
        tech: ["Audio", "Mac", "VST", "Slate Digital"],
        image: "freshair",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 12,
        title: "Spire",
        bio: "Reveal Sound Spire VST Syntehesizer",
        description: "Spire is a software polyphonic synthesizer that combines powerful sound engine modulation with flexible architecture and a graphical interface that provides unparalleled usability.",
        tech: ["Audio", "Mac", "VST", "Slate Digital"],
        image: "spire",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 13,
        title: "Hatsune Miku",
        bio: "Sonicwire Hatsune Miku VST Syntehesizer",
        description: "HATSUNE MIKU V4X offers a polished sound that has been evolving from VOCALOID 2 HATSUNE MIKU to HATSUNE MIKU Append and HATSUNE MIKU V3, introducing a Power mode and mild Whisper mode, to form the definitive edition of virtual singer HATSUNE MIKU.",
        tech: ["Audio", "Mac", "VST", "Sonicwire"],
        image: "miku",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 14,
        title: "Omnisphere",
        bio: "Spectrasonics Omnisphere VST Syntehesizer",
        description: "Omnisphere is the flagship synthesizer of Spectrasonics - an instrument of extraordinary power and versatility. Top Artists all over the world rely on Omnisphere as an essential source of sonic inspiration. This award-winning software brings many different types of synthesis together into one amazing-sounding instrument that will spark a lifetime of exploration.",
        tech: ["Audio", "Mac", "VST", "Spectrasonics"],
        image: "omnisphere",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 15,
        title: "Purity",
        bio: "Sonic Cat (Luxonix) Purity VST Synthesizer",
        description: "Purity is a next generation of digital musical instrument workstation and PCM Sound Module / ROMpler software often regarded as a classic VST synthesizer in the scene.",
        tech: ["Audio", "Mac", "VST", "Sonic Cat"],
        image: "purity",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 16,
        title: "ISY",
        bio: "Doxxing profile generator and manager",
        description: "Contact directly for details...",
        tech: ["Node.js", "Bash", "Shell"],
        image: "isy",
        version: 'v1.0.2',
        fileSize: '30mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 17,
        title: "AutoKey 2",
        bio: "Antares AutoKey 2 VST",
        description: "Find the right key, scale and BPM in seconds. AutoKey 2 scans any audio, then updates AutoTune with one click.",
        tech: ["Audio", "Mac", "VST", "Antares"],
        image: "autokey",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 18,
        title: "a2h Benzo Kit",
        bio: "Appeal2Heaven 2025 Benzo Drum Kit",
        description: "2025 Benzo Drum Kit by Appeal2Heaven. Over 300+ sounds, 20+ loops, and 5 .flp projects for your next cookup.",
        tech: ["Audio", "Sound Kit", "a2h"],
        image: "benzoKit",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 19,
        title: "a2h Benzo Bank",
        bio: "Appeal2Heaven 2025 Benzo Sound Bank",
        description: "2025 Benzo Serum Bank and One Shot Kit by Appeal2Heaven. Huge selection of arps, bass, plucks, keys, pads, and more for use in Serum or as standalone oneshots.",
        tech: ["Audio", "Sound Kit", "a2h"],
        image: "benzoBank",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 20,
        title: "a2h Benzo Presets",
        bio: "Appeal2Heaven 2025 Benzo Preset Kit",
        description: "2025 Benzo Preset Kit by Appeal2Heaven. Turn your shitty bandlab recordings into industry level artwork with these mixer presets. Just drag the .fst into your mixer slot and you'll sound like Corey Lingo.",
        tech: ["Audio", "Sound Kit", "a2h"],
        image: "benzoPresets",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 21,
        title: "EchoBox",
        bio: "EchoBox Home Media Server",
        description: "Stop paying for subscriptions and start pirating. Spin up your EchoBox instance at home and load your favorite movies, shows, or home videos, all for free. Made by 1kikiluvv.",
        tech: ["Node.js", "Bash", "Media"],
        image: "echobox",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 22,
        title: "deezClicks",
        bio: "deezClicks Auto-Clicker",
        description: "AFK with this lightweight, undetectable, CLI-based auto-clicker that mimics natural movement. Made by 1kikiluvv.",
        tech: ["Node.js", "Bash", "Gaming"],
        image: "deezclicks",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 23,
        title: "Icedancer Drum Kit",
        bio: "Bladee Icedancer prod. Ripsquadd Drum Kit",
        description: "Includes the 'boing' from Mallwhore Freestyle.",
        tech: ["Audio", "Sound Kit", "bladee"],
        image: "icedancer",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: true
    },
    {
        id: 24,
        title: "Lovbug Drum Kit",
        bio: "Lovbug Early 2020s Drum Kit",
        description: "This never gonna be available, I'm not giving you the sauce lmfaooooo. Best drum kit OAT.",
        tech: ["Audio", "Sound Kit", "IVY LEAGUE"],
        image: "lovbug",
        version: 'v1.0.2',
        fileSize: '589mb',
        fileType: 'zip',
        available: false
    },
    {
        id: 25,
        title: "Analog Lab V",
        bio: "Arturia Analog Lab V VST Synthesizer",
        description: "Create, produce, perform. Analog Lab is a plugin that combines thousands of world-class presets spanning dozens of timeless instruments, instant-access controls, and flawless integration - in one place.",
        tech: ["Audio", "Mac", "VST", "Arturia"],
        image: "analoglab",
        version: 'v5.10.2',
        fileSize: '4.6gb',
        fileType: 'zip',
        slug: 'Analog_Lab_v5.10.2',
        available: true
    },
    {
        id: 26,
        title: "Inhale",
        bio: "a2h Inhale FX VST",
        description: "gang",
        tech: ["Audio", "Mac", "VST", "a2h"],
        image: "analoglab",
        version: 'v0.0.1',
        fileSize: '555kb',
        fileType: 'zip',
        slug: 'inhale',
        available: true
    }
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

router.get('/download/:slug', (req, res, next) => {
    const { slug } = req.params;
    console.log('Downloading ', slug)

    const fileMap: Record<string, string> = {
        '1': 'kys.zip',
        '2': 'gonephishin.zip',
        '3': 'flstudio-20.zip',
        '4': 'serum.zip',
        '5': 'fabfilter.zip',
        '6': 'ep1.zip',
        '7': 'dune3.zip',
        '8': 'halftime.zip',
        '9': 'rx11.zip',
        '10': 'Auto-Tune_Artist_v9.2.0.zip',
        '11': 'freshair.zip',
        '12': 'spire.zip',
        '13': 'miku.zip',
        '14': 'omnisphere.zip',
        '15': 'purity.zip',
        '16': 'isy.zip',
        '17': 'autokey.zip',
        '18': 'benzokit.zip',
        '19': 'benzobank.zip',
        '20': 'benzopresets.zip',
        '21': 'echobox.zip',
        '22': 'deezclicks.zip',
        '25': 'Analog_Lab_v5.10.2.zip',
        '26': 'inhale.zip'
    };

    const fileName = fileMap[slug];

    if (!fileName) {
        return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', 'assets', fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found on disk' });
    }

    const stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Length': stat.size,
        'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on('error', err => {
        console.error('Stream error:', err);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Failed to stream file' });
        }
    });

    res.on('close', () => {
        readStream.destroy(); // prevent leaks on interrupted connection
    });
});


export default router;

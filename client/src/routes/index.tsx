// client/src/routes/index.tsx (main tsx router)

import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Software from '../pages/software/Software'
import SoftwareDetail from '../pages/software/SoftwareDetail'
import Kits from '../pages/kits/Kits'
import KitsDetail from '../pages/kits/KitsDetail'
import Resume from '../pages/resume/Resume'
import DMCA from '../pages/dmca/DMCA'
import Gallery from '../pages/gallery/Gallery'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'software',
                element: <Software />,
                children: [
                    { path: ':id', element: <SoftwareDetail /> }
                ]
            },
            {
                path: 'kits',
                element: <Kits />,
                children: [
                    { path: ':id', element: <KitsDetail /> }
                ]
            },
            { path: 'gallery', element: <Gallery /> },
            { path: 'resume', element: <Resume /> },
            { path: 'dmca', element: <DMCA /> }
        ],
    },
])


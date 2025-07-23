// client/src/routes/index.tsx (main tsx router)

import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Software from '../pages/software/Software'
import SoftwareDetail from '../pages/software/SoftwareDetail'
import Contact from '../pages/contact/Contact'
import DMCA from '../pages/dmca/DMCA'
import Archive from '../pages/archive/Archive'
import NotFound from '../pages/notFound/NotFound'

import Resume from '../pages/resume/Resume'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'software',
                element: <Software />,
                children: [
                    { path: ':id', element: <SoftwareDetail /> }
                ]
            },
            { path: 'resume', element: <Resume />},
            { path: 'archive', element: <Archive /> },
            { path: 'contact', element: <Contact /> },
            { path: 'dmca', element: <DMCA /> },
            { path: '*', element: <NotFound /> }
        ],
    },
])


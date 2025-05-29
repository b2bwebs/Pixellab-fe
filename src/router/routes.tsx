import { Children, lazy } from 'react';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import AssetPage from '@/pages/Asset/AssetPage';
import AuthWrapper from './AuthWrapper';
import BlankLayout from '@/components/Layouts/BlankLayout';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

import ClientsPage from '@/pages/Clients/ClientsPage';

//Auth
const LoginPage = lazy(() => import('@/pages/Authentication/LoginPage'));

const routes = [
    {
        path: '/',
        element: <AuthWrapper />,
        children: [
            {
                // element: <BlankLayout />,
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <DefaultLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardPage />,
                    },
                    {
                        path: '',
                        element: <DashboardPage />,
                    },

                    {
                        path: '/clients',
                        element: <ClientsPage />,
                        layout: 'default',
                    },
                ],
            },
        ],
    },
];

export { routes };

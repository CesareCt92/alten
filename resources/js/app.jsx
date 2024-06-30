import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.min.css';


const routes = [
    {
        path: '/',
        element: <Layout />,
    },
    {
        path: '/beer-list',
        element: <List />,
    }
];

createRoot(document.getElementById('root')).render(
    <RouterProvider
    router={createBrowserRouter(routes)}
    />
);

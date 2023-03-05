import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ContestPage from './pages/ContestPage';
import RankingPage from './pages/RankingPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SubmissionPage from './pages/SubmissionsPage';
import ProductsPage from './pages/ProductsPage';
import ChallengePage from './pages/ChallengePage';
import DashboardAppPage from './pages/DashboardAppPage';
import authMiddleware from './middlewares/auth';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'challenges/:id', element: <ChallengePage/> },
        { path: 'challenges', element: <DashboardAppPage /> },
        { path: 'ranking', element: <RankingPage /> },
        { path: 'submissions', element: <SubmissionPage /> },
        { path: 'contests', element: <ContestPage /> },
      ],
      middleware : [authMiddleware]
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/challenges" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

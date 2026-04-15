import { DashboardLayout } from "../components/layout/DashboardLayout";
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { DashboardHome } from "../pages/DashboardHome";
import { ListaObras } from "../components/ListaObras";

const rootRoute = createRootRoute({
    component: () => (
        <DashboardLayout>
            <Outlet/>
        </DashboardLayout>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: DashboardHome,
});

const obrasRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/obras',
    component: ListaObras,
});

const partesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/partes',
    component: () => <div className="dark:text-white text-2xl">Lista de Partes Diarios (Próximamente) </div>
});

const routeTree = rootRoute.addChildren([indexRoute, obrasRoute, partesRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
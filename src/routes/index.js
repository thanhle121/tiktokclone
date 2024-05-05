import { Home, Following, Upload } from '~/pages';
import { DefaultLayout, HeaderOnly } from '~/layouts';
import routers from '~/config/routers';

const publicRoutes = [
    {
        path: routers.root,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: routers.following,
        component: Following,
        layout: DefaultLayout,
    },
    {
        path: routers.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: routers.users,
        component: Upload,
        layout: DefaultLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

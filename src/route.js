import Management from './renderer/Management.tsx';
import Recognition from './renderer/Recognition.tsx';

// 路由管理
const routes = [
    {
      name: 'firstPage',
      path: '/',
      component: Recognition
    },
    {
        name: 'Management',
        path: '/Management',
        component: Management
    },
    {
        name: 'Recognition',
        path: '/Recognition',
        component: Recognition
    }
]

export default routes;
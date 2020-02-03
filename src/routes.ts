import Welcome from './modules/Welcome';
import Project from './modules/Project';

export default [
  {
    path: '/',
    exact: true,
    pageTitle: 'Welcome',
    component: Welcome
  },
  {
    path: '/project',
    pageTitle: 'Project',
    component: Project
  }
];

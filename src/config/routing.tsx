import React from 'react';
import { Route, Switch } from 'react-router-dom'; 

interface LocalRoute {
    component: React.ComponentType,
    path: string,
    exact?: boolean
}

const renderComponent = (route: LocalRoute, props: any) => (
    <route.component { ...props } />
);

export default (routes: Array<LocalRoute>) => {
    return (
        <Switch>
            { 
                routes.map((route, index) => (
                    <Route
                        key={ index }
                        path={ route.path }
                        exact={ route.exact }
                        component={ (props: any) => renderComponent(route, props) }
                    />
                ))
            }
        </Switch>
    );
};
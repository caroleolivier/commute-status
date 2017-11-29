import * as React from 'react';

import { Header } from './Header';
import { CommuteRoute, ICommuteRouteConfig } from './CommuteRoute';


interface ICommuteRoutesConfig {
    name: string;
    routes: ICommuteRouteConfig[];
}

interface ICommuteRoutesProps {
    config: ICommuteRoutesConfig;
}

export class CommuteRoutes extends React.Component<ICommuteRoutesProps, {}> {
    render(): JSX.Element {
        const routesComponents = this.props.config.routes.map(
            routeConfig => <CommuteRoute key={routeConfig.routeName} config={routeConfig} />);
        return (
            <div>
                <Header name={this.props.config.name} />
                <div>
                    {routesComponents}
                </div>
            </div>
        );
    }
}
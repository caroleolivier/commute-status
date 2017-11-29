import * as React from 'react';

import { StationContainer } from './station/StationContainer';
import * as styles from './CommuteRoute.scss';

export interface ICommuteRouteConfig {
    routeName: string;
    stops: any[];
}

interface ICommuteRouteProps {
    config: ICommuteRouteConfig;
}

export class CommuteRoute extends React.Component<ICommuteRouteProps, {}> {
    render(): JSX.Element {
        return (
            <div className={styles.commuteRoute}>
                <h2>{this.props.config.routeName}</h2>
                <div className="horizontalContainer">
                    {this.props.config.stops.map(stopConfig => <StationContainer key={stopConfig.stationId} config={stopConfig} />)}
                </div>
            </div>
        );
    }
}

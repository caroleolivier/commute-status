import * as React from 'react';

import * as styles from './CommuteRoutes.scss';
import { ICommuteRoutesConfig } from '../config/configtype';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommuteRoute } from './CommuteRoute';

interface ICommuteRoutesProps {
    config: ICommuteRoutesConfig;
}

export class CommuteRoutes extends React.Component<ICommuteRoutesProps, {}> {
    render(): JSX.Element {
        const routesComponents = this.props.config.routes.map(
            routeConfig => <CommuteRoute key={routeConfig.routeName} config={routeConfig} />);
        return (
            <div className={styles.container}>
                <div className={styles.header} >
                    <Header name={this.props.config.name} />
                </div>
                <div className={styles.content}>
                    {routesComponents}
                </div>
                <div className={styles.footer} >
                    <Footer/>
                </div>
            </div>
        );
    }
}
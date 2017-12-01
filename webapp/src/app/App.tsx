import * as React from 'react';
import { config } from '../config/config';

import * as styles from './App.scss';
import { CommuteRoutes } from '../route/CommuteRoutes';
import { ErrorMessage } from '../common/ErrorMessage';
import { RouteSelector } from '../routeSelector/RouteSelector';

interface IAppProps {
    urlArg: string;
}

export class App extends React.Component<IAppProps, {}> {
    render() {
        let content;
        if (this.props.urlArg in config) {
            const key = this.props.urlArg;
            content = <CommuteRoutes config={config[key]} />;
        }
        else if (this.props.urlArg === '') {
            content = <RouteSelector />;
        }
        else {
            content = (
                <div className={styles.errorMessage}>
                    <ErrorMessage message="Unknown URL" />
                </div>
            );
        }

        return (
            <div className={styles.app}>
                {content}
            </div>
        );
    }
}

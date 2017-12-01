import * as React from 'react';

import * as styles from './App.scss';
import { CommuteRoutes } from '../route/CommuteRoutes';
import { ErrorMessage } from '../common/ErrorMessage';
import { RouteSelector } from '../routeSelector/RouteSelector';
import * as config from '../config/config';

interface IAppProps {
    urlArg: string;
}

export class App extends React.Component<IAppProps, {}> {
    render(): JSX.Element {
        let content;
        if (config.config.has(this.props.urlArg)) {
            const key = this.props.urlArg;
            content = <CommuteRoutes config={config.config.get(key)} />;
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

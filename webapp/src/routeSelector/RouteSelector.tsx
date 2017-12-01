import * as React from 'react';
import * as styles from './styles.scss';
import { config } from '../config/config';

export class RouteSelector extends React.Component {
    render(): JSX.Element {
        const links = Object.keys(config).map(key =>
            <div className={styles.LinkContainer} key={key}><a href={`/#/${key}`}><span>{config[key].name}</span></a></div>
        );
        return (
            <div className={styles.RouteSelector}>
                {links}
            </div>
        );
    }
}

import * as React from 'react';
import * as styles from './styles.scss';
import { config } from '../config/config';

export class RouteSelector extends React.Component {
    render(): JSX.Element {
        const links: JSX.Element[] = [];
        for (let entry of config) {
            let key = entry[0];
            let c = entry[1];
            links.push(
                <div className={styles.LinkContainer} key={key}><a href={`/#/${key}`}><span>{c.name}</span></a></div>
            );
        }
        return (
            <div className={styles.RouteSelector}>
                {links}
            </div>
        );
    }
}

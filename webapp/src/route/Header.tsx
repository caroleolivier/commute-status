import * as React from 'react';

import * as styles from './Header.scss';

interface HeaderProps {
    name: string;
}

export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className={styles.header}>
                <h1 className={styles.title}>{this.props.name}</h1>
            </div>
        );
    }
}

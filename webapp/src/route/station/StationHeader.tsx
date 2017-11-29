import * as React from 'react';

import * as styles from './styles.scss';

interface ICssMapper {
    getClass(): string
}

const StationHeaderClasses: Map<string, ICssMapper> = new Map([
    ['bus', { getClass: () => `fa fa-bus ${styles.busIcon} ${styles.icon}`}],
    ['tube', { getClass: () => `fa fa-subway ${styles.tubeIcon} ${styles.icon}`}],
    ['train', { getClass: () => `fa fa-train ${styles.trainIcon} ${styles.icon}`}]
]);

interface StationHeaderProps
{
    stationName: string;
    direction: string;
    transportType: string; // todo: replace with enum like type
}

export class StationHeader extends React.Component<StationHeaderProps, {}> {
    
    render(): JSX.Element {
        return (
            <div className={`horizontalContainer ${styles.header}`}>
                <i className={StationHeaderClasses.get(this.props.transportType).getClass()} />
                <h3>{this.props.stationName}</h3>
                <i className={`fa fa-arrow-right ${styles.arrow}`} />
                <h3>{this.props.direction}</h3>
            </div>
        );
    }
}

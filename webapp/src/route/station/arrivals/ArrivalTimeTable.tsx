import * as React from 'react';
import { ArrivalRow } from './ArrivalRow';
import { ArrivalTime } from '../../../services/ArrivalTime';
import * as styles from './ArrivalTimeTable.scss';


interface IArrivalTimeTableProps {
    arrivals: ArrivalTime[]
}

export class ArrivalTimeTable extends React.Component<IArrivalTimeTableProps, {}> {
    render(): JSX.Element {
        const rows: JSX.Element[] = this.props.arrivals
            .sort((a, b) => (a.expectedSeconds > b.expectedSeconds ? 1 : -1))
            .map(arrival => {
                const key: string = `${arrival.expectedSeconds}${arrival.lineName}`;
                const row: JSX.Element =
                    <ArrivalRow key={key} info={arrival.lineName} expectedSecs={arrival.expectedSeconds} />;
                return row;
            });

        return (
            <table className={styles.arrivalTable}>
                <thead>
                    <tr>
                        <th className={styles.infoCol} />
                        <th className={styles.arrivalTimeCol} />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

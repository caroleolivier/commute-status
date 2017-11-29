import * as React from 'react';
import { ArrivalTime } from '../../../services/ArrivalTime';

interface IArrivalRowProps {
    info: string;
    expectedSecs: number;
}

export class ArrivalRow extends React.Component<IArrivalRowProps, {}> {
    render(): JSX.Element {
        const expectedInMins = Math.round(this.props.expectedSecs / 60);
        return (
            <tr>
                <td>{this.props.info}</td>
                <td>{expectedInMins} min(s)</td>
            </tr>
        );
    }
}

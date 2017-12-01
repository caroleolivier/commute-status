import 'whatwg-fetch';
import * as React from 'react';

import { IStationContainerConfig } from '../../config/configtype';
import { ArrivalTime } from '../../services/ArrivalTime';
import { StationHeader } from './StationHeader';
import { ArrivalTimeTable } from './arrivals/ArrivalTimeTable';
import { Loading } from '../../common/Loading';
import { ErrorMessage } from '../../common/ErrorMessage';
import { IDataAPIService } from '../../services/IDataAPIService';
import { TfLDataAPIService } from '../../services/TfLDataAPIService';
import { NationalRailAPIService } from '../../services/NationalRailAPIService';

import * as styles from './StationContainer.scss';

interface IDataApiServiceMapper {
    get(): IDataAPIService;
}

const services: Map<string, IDataApiServiceMapper> = new Map<string, IDataApiServiceMapper>([
    ['tube', { get: () => new TfLDataAPIService() }],
    ['bus', { get: () => new TfLDataAPIService() }],
    ['train', { get: () => new NationalRailAPIService() }]
]);

export const stationContainerStates: Map<string, IStationContainerStateItem> = new Map<string, IStationContainerStateItem>([
    ["LOADING", {
        id: 0,
        getComponent: () => <Loading />
    }],
    ["ERROR", {
        id: 1,
        getComponent: () => <ErrorMessage message="Unable to load data" />
    }],
    ["LOADED", {
        id: 2,
        getComponent: container => <ArrivalTimeTable arrivals={container.state.expectedTimes} />
    }]
]);

export interface IStationContainerProps {
    config: IStationContainerConfig;
}

export interface IStationContainerState {
    state: IStationContainerStateItem;
    expectedTimes: ArrivalTime[];
}

interface IStationContainerStateItem {
    id: number;
    getComponent(parent: StationContainer): JSX.Element;
}

export class StationContainer extends React.Component<IStationContainerProps, IStationContainerState> {
    constructor(props: IStationContainerProps) {
        super(props);
        const initialState: Readonly<IStationContainerState> = {
            state: stationContainerStates.get('LOADING'),
            expectedTimes: []
        };
        this.state = initialState;
    }

    componentDidMount(): void {
        const service: IDataAPIService = services.get(this.props.config.type).get();
        service.fetchArrivals(this.props.config)
            .then((arrivalTimes) => {
                /* lot of discussions around whether setState should be called here or not :s */
                this.setState({
                    expectedTimes: arrivalTimes.slice(0, 4),
                    state: stationContainerStates.get('LOADED')
                });
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    state: stationContainerStates.get('ERROR')
                });
            });
    }

    render(): JSX.Element {
        const stationContent: JSX.Element = this.state.state.getComponent(this);
        return (
            <div className={styles.container}>
                <StationHeader
                    stationName={this.props.config.stationName}
                    direction={this.props.config.travelDirection}
                    transportType={this.props.config.type}
                />
                {stationContent}
            </div>
        );
    }
}

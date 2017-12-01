export interface ICommuteRoutesConfig {
    name: string;
    routes: ICommuteRouteConfig[];
}

export interface ICommuteRouteConfig {
    routeName: string;
    stops: IStationContainerConfig[];
}

export interface IStationContainerConfig {
    type: string;
    stationName: string;
    stationId: string,
    travelDirection: string;
    direction?: string,
    directionId?: string,
    lines?: string[],
    filterDirection?: string,
    destinationId?: string
}
import { ArrivalTime } from './ArrivalTime';

export interface IDataAPIService {
    fetchArrivals(input: any): Promise<ArrivalTime[]>;
}
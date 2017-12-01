export const config = {
    toWorkNic: {
        name: 'To work for Nic',
        routes: [
            {
                routeName: 'Via Tooting Broadway',
                stops: [
                    {
                        type: 'bus',
                        stationName: 'Wimbledon Road',
                        travelDirection: 'Tooting Broadway',
                        stationId: '490008430E',
                        direction: 'Tooting Broadway',
                        directionId: 'outbound',
                        lines: ['77', '44', '270']
                    },
                    {
                        type: 'tube',
                        stationName: 'Tooting Broadway',
                        travelDirection: 'Central London',
                        stationId: '940GZZLUTBY',
                        direction: 'Central London',
                        directionId: 'outbound',
                        lines: ['northern']
                    }
                ]
            },
            {
                routeName: 'Via Earlsfield',
                stops: [
                    {
                        type: 'bus',
                        stationName: 'Huntspill Street',
                        travelDirection: 'Earlsfield',
                        stationId: '490008430W',
                        direction: 'Earlsfield',
                        directionId: 'inbound',
                        lines: ['77', '44', '270']
                    },
                    {
                        type: 'train',
                        stationName: 'Earlsfield',
                        travelDirection: 'Waterloo',
                        stationId: 'EAD',
                        filterDirection: 'to',
                        destinationId: 'WAT'
                    },
                    {
                        type: 'tube',
                        stationName: 'Waterloo',
                        travelDirection: 'Bank',
                        stationId: '940GZZLUWLO',
                        direction: 'Bank',
                        directionId: 'outbound',
                        lines: ['waterloo-city']
                    }
                ]
            }
        ]
    },
    toHomeNic: {
        name: 'Back home for Nic',
        routes: [
            {
                routeName: 'Via Waterloo',
                stops: [
                    {
                        type: 'tube',
                        stationName: 'Bank',
                        travelDirection: 'Waterloo',
                        stationId: '940GZZLUBNK',
                        direction: 'Waterloo',
                        directionId: 'inbound',
                        lines: ['waterloo-city']
                    },
                    {
                        type: 'train',
                        stationName: 'Waterloo',
                        travelDirection: 'Earlsfield',
                        stationId: 'EAD',
                        filterDirection: 'from',
                        destinationId: 'WAT'
                    },
                    {
                        type: 'bus',
                        stationName: 'Earlsfield',
                        travelDirection: 'Huntspill Street',
                        stationId: '490006306D',
                        direction: 'Tooting Broadway',
                        directionId: 'outbound',
                        lines: ['77', '44', '270']
                    }
                ]
            },
            {
                routeName: 'Via Tooting Broadway',
                stops: [
                    {
                        type: 'tube',
                        stationName: 'Bank',
                        travelDirection: 'Tooting Broadway',
                        stationId: '940GZZLUBNK',
                        direction: 'Tooting Broadway',
                        directionId: 'inbound',
                        lines: ['northern']
                    },
                    {
                        type: 'bus',
                        stationName: 'Tooting Broadway',
                        travelDirection: 'Huntspill Street',
                        stationId: '490000234H',
                        direction: 'Earlsfield',
                        directionId: 'inbound',
                        lines: ['77', '44', '270']
                    }
                ]
            }
        ]
    }
};

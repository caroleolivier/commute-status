const config = {
    fromHome: [
        {
            routeName: 'Via Tooting Broadway',
            stops: [
                {
                    type: 'bus',
                    stationName: 'Wimbledon Road',
                    stationId: '490008430E',
                    direction: 'Tooting Broadway',
                    directionId: 'outbound',
                    lines: ['77', '44', '270']
                },
                {
                    type: 'tube',
                    stationName: 'Tooting Broadway',
                    stationId: '940GZZLUTBY',
                    direction: 'Central London',
                    directionId: 'inbound',
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
                    stationId: '490008430W',
                    direction: 'Earlsfield',
                    directionId: 'inbound',
                    lines: ['77', '44', '270']
                },
                // {
                //     type: 'train',
                //     stationName: 'Earlsfield',
                //     stationId: '',
                //     direction: '',
                //     directionId: '',
                //     lines: ['']
                // },
                {
                    type: 'tube',
                    stationName: 'Waterloo',
                    stationId: '940GZZLUWLO',
                    direction: 'Bank',
                    directionId: 'outbound',
                    lines: ['waterloo-city']
                }
            ]
        }
    ]
};

export default config;

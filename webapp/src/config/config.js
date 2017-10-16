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
                    stationId: '490008430W',
                    direction: 'Earlsfield',
                    directionId: 'inbound',
                    lines: ['77', '44', '270']
                },
                {
                    type: 'train',
                    stationName: 'Earlsfield',
                    stationId: '',
                    direction: '',
                    directionId: '',
                    lines: ['']
                },
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
    ],
    toHome: [
        {
            routeName: 'Via Waterloo',
            stops: [
                {
                    type: 'tube',
                    stationName: 'Bank',
                    stationId: '940GZZLUBNK',
                    direction: 'Waterloo',
                    directionId: 'inbound',
                    lines: ['waterloo-city']
                },
                {
                    type: 'train',
                    stationName: 'Waterloo',
                    stationId: '',
                    direction: '',
                    directionId: '',
                    lines: ['']
                },
                {
                    type: 'bus',
                    stationName: 'Earlsfield',
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
                    stationId: '940GZZLUBNK',
                    direction: 'Tooting Broadway',
                    directionId: 'inbound',
                    lines: ['northern']
                },
                {
                    type: 'bus',
                    stationName: 'Tooting Broadway',
                    stationId: '490000234H',
                    direction: 'Earlsfield',
                    directionId: 'inbound',
                    lines: ['77', '44', '270']
                }
            ]
        }
    ]
};

export default config;

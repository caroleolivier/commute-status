const config = {
    fromHome: {
        busStations: [
            {
                stationName: 'Huntspill Street',
                stationId: '490008430W',
                direction: 'Earlsfield',
                directionId: 'inbound',
                buses: ['77', '44', '270']
            },
            {
                stationName: 'Wimbledon Road',
                stationId: '490008430E',
                direction: 'Tooting Broadway',
                directionId: 'outbound',
                buses: ['77', '44', '270']
            }
        ],
        tubeStations: [
            {
                stationName: 'Tooting Broadway',
                stationId: '940GZZLUTBY',
                direction: 'Central London',
                directionId: 'inbound',
                lineName: 'northern'
            }
        ]
    }
};

export default config;

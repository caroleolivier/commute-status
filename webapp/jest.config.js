module.exports = {
    verbose: true,
    setupFiles: [
        './enzyme-setup.js'
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    testRegex: '/*.test.(ts|tsx|js)$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    }
};

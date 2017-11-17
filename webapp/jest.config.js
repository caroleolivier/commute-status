module.exports = {
    verbose: true,
    setupFiles: [
        './enzyme-setup.js'
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    }
    //,
    // moduleFileExtensions: [
    //     'js', 'json', 'ts'
    // ]
};

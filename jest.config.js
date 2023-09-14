module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    typeRoots: ["./node_modules/@types", "./types"],
};

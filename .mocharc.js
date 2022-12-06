"use strict";

module.exports = {
    recursive: true,
    require: ["ts-node/register", "source-map-support/register"],
    spec: "test/**/*.spec.ts",
    reporter: "xunit",
    reporterOptions: "output=mocha-results.xml"
}
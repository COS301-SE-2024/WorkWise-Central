module.exports = {
  ci: {
    collect: {
      staticDistDir: "./src/frontend/dist",
      url: ["http://localhost/"],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

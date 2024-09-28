module.exports = {
  ci: {
    collect: {
      staticDistDir: "./src/frontend/dist",
      url: ["http://localhost/5173"],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

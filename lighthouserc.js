module.exports = {
  ci: {
    collect: {
      //staticDistDir: "./src/frontend/dist",
      startServerCommand: "cd src/frontend && npm run start:prod",
      url: [
        "http://localhost/",
        "http://localhost/dashboard",
        "http://localhost/chatHome",
        "http://localhost/appointments",
        "http://localhost/notifications",
        "http://localhost/support",
        "http://localhost/userSettings",
        "http://localhost/manageCompanies",
        "http://localhost/manageCompanies",
      ],
      numberOfRuns: 3,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

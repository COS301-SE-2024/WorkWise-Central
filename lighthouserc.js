module.exports = {
  ci: {
    collect: {
      //staticDistDir: "./src/frontend/dist",
      url: [
        "https://tuksui.sharpsoftwaresolutions.net/",
        "https://tuksui.sharpsoftwaresolutions.net/dashboard",
        "https://tuksui.sharpsoftwaresolutions.net/chatHome",
        // "https://tuksui.sharpsoftwaresolutions.net/appointments",
        // "https://tuksui.sharpsoftwaresolutions.net/notifications",
        // "https://tuksui.sharpsoftwaresolutions.net/support",
        // "https://tuksui.sharpsoftwaresolutions.net/userSettings",
        // "https://tuksui.sharpsoftwaresolutions.net/manageCompanies",
        // "https://tuksui.sharpsoftwaresolutions.net/manageCompanies",
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

module.exports = {
  type: "b",
  purge: {
    enabled: process.env.BUILD === "true",
    content: ["./src/**/*.vue", "./src/**/*.html"],
  },
};

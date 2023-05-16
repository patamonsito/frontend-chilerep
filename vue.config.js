module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    host: "0.0.0.0",
    proxy: "http://localhost:3000"
  }
}

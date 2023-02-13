module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    host: "0.0.0.0",
    proxy: "http://192.168.1.101:3000"
  }
}

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: "http://localhost:3000"
  }
}

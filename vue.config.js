module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: "localhost:3000"
  }
}

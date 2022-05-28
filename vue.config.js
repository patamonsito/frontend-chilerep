module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: "http://143.198.165.86:3000"
  }
}

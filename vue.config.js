module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '143.198.165.86',
    proxy: "http://143.198.165.86:3000"
  }
}

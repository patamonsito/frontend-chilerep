module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    host: '143.198.165.86',
    proxy: "http://143.198.165.86:3000"
  }
}

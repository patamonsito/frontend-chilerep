module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    host: 'localhost',
    proxy: "http://localhost:3000"
  }
}

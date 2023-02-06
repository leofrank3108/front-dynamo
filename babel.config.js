module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      plugins: [["inline-dotenv",{
        path: '.env.development'
      }]]
    }
  },
  plugins: [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` for less
  ]
}

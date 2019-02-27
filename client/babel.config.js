module.exports = {
  presets: [
    '@vue/app',
    // ["es2015", { "modules": false }]
    ["@babel/preset-env"]
  ],

  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

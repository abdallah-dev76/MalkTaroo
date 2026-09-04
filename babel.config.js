module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '@assets': './src/assets',
          '@common': './src/common',
          '@features': './src/features',
          '@theme': './src/theme',
          '@translation': './src/translation',
        },
      },
    ],
    [
      'react-native-unistyles/plugin',
      {
        // pass root folder of your application
        // all files under this folder will be processed by the Babel plugin
        // if you need to include more folders, or customize discovery process
        // check available babel options
        root: 'src',
      },
    ],
  ],
};

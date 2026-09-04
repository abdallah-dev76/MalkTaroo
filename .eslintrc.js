module.exports = {
  root: true,
  extends: '@react-native',

  rules: {
    // Warn if console.log is left in the code.
    'no-console': 'warn',

    // Prevent debugger statements.
    'no-debugger': 'error',

    // Force === and !== instead of == and !=.
    eqeqeq: ['error', 'always'],

    // Require braces for if / else / loops.
    curly: ['error', 'all'],

    // Prefer const when a variable is never reassigned.
    'prefer-const': 'warn',

    // Allow intentionally unused variables starting with "_".
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Warn when styles are written inline in JSX.
    'react-native/no-inline-styles': 'warn',
  },
};
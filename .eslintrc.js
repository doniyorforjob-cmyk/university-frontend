module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],
  rules: {
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
    'no-undef': 'error',
    'import/no-unresolved': 'off', // Webpack alias bilan ishlaydi
    'jsx-a11y/label-has-associated-control': 'off', // Shadcn/ui uchun
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};


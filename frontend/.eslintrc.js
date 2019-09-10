module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'react-hooks',
    'prettier',
    'import',
    'jsx-a11y',
    'jest'
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/camelcase': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      files: ['server/authFunctions.ts'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off'
      }
    },
    {
      files: ['server/authRoutes.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['pages/_app.tsx', 'src/components/TagsInput.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['src/components/TagsInput.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['pages/_document.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: ['next.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: ['src/components/TagsSelect.tsx', 'src/components/Link.tsx'],
      rules: {
        'react/display-name': 'off'
      }
    },
    {
      files: ['src/components/Link.tsx'],
      rules: {
        'jsx-a11y/anchor-has-content': 'off'
      }
    },
    {
      files: ['src/store/tags/reducer.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['src/components/TagsInput.tsx'],
      rules: {
        'import/named': 'off',
        'import/namespace': 'off'
      }
    }
  ]
};

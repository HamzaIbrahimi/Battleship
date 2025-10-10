module.exports = {
    env: {
        browser: true,
        es2022: true,
        jest: true,
    },
    rules: {
        'no-unused-vars': 'warn',
        quotes: ['error', 'single'],
        'no-console': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'import/extensions': [
            'error',
            'always',
            {
                js: 'always',
            },
        ],
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
};

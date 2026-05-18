import pluginVue from 'eslint-plugin-vue'
import * as vueParser from 'vue-eslint-parser'
import * as tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    
    plugins: {
      vue: pluginVue,
    },

    languageOptions: {

      parser: vueParser, 
      parserOptions: {
				<script> 
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },

    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },
];
module.exports = {
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'chore']],
    'scope-case': [0, 'always', 'camel-case'],
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      ['React', 'Node', 'Engineering', 'DataStructure', 'Others', 'Base'],
    ],
  },
};

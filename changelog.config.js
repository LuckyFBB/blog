module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'refactor', 'chore'],
  maxMessageLength: 80,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject'],
  scopes: ['AI', 'React', 'Node', 'Engineering', 'DataStructure', 'Others', 'Base'],
  types: {
    feat: {
      description: 'Add a new blog',
      emoji: '🎈',
      value: 'feat',
    },
    fix: {
      description: 'Fix blog',
      emoji: '🍟',
      value: 'fix',
    },
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    messages: {
      type: "Select the type of change that you're committing:",
      customScope: 'Select the scope this blog affects:',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n',
    },
  },
};

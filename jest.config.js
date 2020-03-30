module.exports = {
  preset: 'ts-jest',

  // TODO: Remove when `network-information-types` become obsolete
  transformIgnorePatterns: ['/node_modules/(!network-information-types/)'],
  moduleNameMapper: {
    'network-information-types':
      'network-information-types/dist-types/index.d.ts',
  },
};

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'uses-server');
defineTest(__dirname, 'transform', null, 'already-imports');

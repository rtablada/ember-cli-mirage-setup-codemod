module.exports = function transformer (file, api) {
  // setup
  const j = api.jscodeshift
  const root = j(file.source)

  // "main"
  if (doesNotHaveImportAlready(root) && usesServerGlobal(root)) { // if faker isn't used in this file, skip it
    insertSetupMirageImportAfterSetupApplicationTest(root)
    insertSetupMirageCallAfterSetupApplicationTest(root)
  }

  return root.toSource({quote: 'single'})

  // global checks
  function usesServerGlobal (root) {
    return root
      .find(j.MemberExpression)
      .some(isUsingServerGlobal)
  }

  function doesNotHaveImportAlready(root) {
    return ! root
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === 'ember-cli-mirage/test-support/setup-mirage')
      .some(() => true)
  }

  function insertSetupMirageImportAfterSetupApplicationTest (root) {
    root
      .find(j.ImportDeclaration)
      .filter(path => {
        return path.node.source.value === 'ember-qunit' || path.node.source.value === 'ember-mocha';
      })
      .insertAfter(standardSetupMirageImport())
  }

  // node generation
  function standardSetupMirageImport () {
    return j.importDeclaration(
      [
        fakerSpecifier()
      ],
      j.literal('ember-cli-mirage/test-support/setup-mirage')
    )
  }

  function fakerSpecifier () {
    return j.importDefaultSpecifier(j.identifier('setupMirage'))
  }

  function insertSetupMirageCallAfterSetupApplicationTest (root) {
    let setupTest = root
      .find(j.CallExpression)
      .filter(path => {
        return path.node.callee.name === 'setupApplicationTest';
      }).paths()[0];

    debugger;
    setupTest.parentPath.insertAfter(standardCallMirage())
  }

  // node generation
  function standardCallMirage () {
    return j.expressionStatement(
      j.callExpression(
        j.identifier('setupMirage'),
        [j.identifier('hooks')]
      )
    );
  }

  // node checks - memberExpression
  function isUsingServerGlobal (memberExpression) {
    return memberExpression.node.object.name === 'server'
  }
}

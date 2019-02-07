This codemod is to help transition to `module` tests from `moduleForAcceptance` tests in Ember Acceptance Tests.
To do this the codemod looks for references to the `server` global and if needed adds `setupMirage(hooks)` and the associated import statement.

This codemod is based on [ember-cli-mirage-faker-codemod](https://github.com/caseywatts/ember-cli-mirage-faker-codemod/blob/master/transform.js) which setup the project structure.

### Run the codemod
This example will run the codemod on all files in the `./tests` folder. Then you can selectively check in as many changes as you'd like to keep (try `git add -p`!).

```
npm install -g jscodeshift
jscodeshift -t https://raw.githubusercontent.com/rtablada/ember-cli-mirage-setup-codemod/master/transform.js ./tests/acceptance
```

- If you find additional edge cases, please clone this repo and contribute :D
- Don't be afraid of codemods, check out Casey's [tutorial](https://caseywatts.com/2018/08/23/codemods.html)

## Development

```
git clone https://github.com/rtablada/ember-cli-mirage-setup-codemod`
cd ember-cli-mirage-faker-codemod`
npm install
npm test
npm run codemod path/to/directories/or/files/you/want
```

Make sure to add test cases to the `__testfixtures__` (see the [tutorial](https://caseywatts.com/2018/08/23/codemods.html) for details).

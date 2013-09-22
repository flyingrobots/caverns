# Running Tests

For now, you'll need to deploy for offline mode using rake, then open `SpecRunner.html` in a web browser. 

This process has been automated by the `test:client` rake task:

    rake test:client

**Note:** Until we get around to creating a pre-commit hook that runs the tests, it is your responsibility to ensure that tests pass before pushing to `origin master`. 

Please do not push commits to `origin master` that fails tests. (That sort of thing belongs on a `dev` or `wip` branch.)

## Test Workflow Improvements

* Convert old tests into Jasmine specs
* Remove dependency on opening `SpecRunner.html` in a browser to detect test results
* Create a pre-commit hook that runs the client test rake script and rejecting when tests fail



require "#{File.dirname(__FILE__)}/rake_helper"

=begin

  # Jasmine
  
  Jasmine is a behavior-driven development framework for testing JavaScript
  code. It does not rely on the DOM or require any other JavaScript frameworks,
  and is therefore suitable for testing both the client and server code.
  
  For more information, see [Jasmine](http://pivotal.github.io/jasmine/)
  
  ## Deployment Steps:

  1. Sync the submodule to the latest `origin/master` commit.
  2. Copy the release candidate zip from dist/ to a temporary directory
  3. Unzip the release
  4. Copy the contents of the unzipped 'lib' directory to the deployment target directory

=end

def deployJasmine targetDirectoryPath

  $stdout.puts RakeHelper::blue("== Jasmine ==")

  projectRoot = RakeHelper::projectRoot
  depsRoot = "#{projectRoot}/deps"
  jasmineRoot = "#{depsRoot}/jasmine.git"
  tmpDir = "/tmp/caverns_rake/deploy/jasmine"

  FileUtils.rm_rf tmpDir
  FileUtils.mkdir_p tmpDir

  RakeHelper::deployDependency(jasmineRoot, targetDirectoryPath) {
    RakeHelper::doit "mkdir -p #{tmpDir}"
    RakeHelper::doit "cp #{jasmineRoot}/dist/jasmine-standalone-*-rc*.* #{tmpDir}"
    Dir.chdir(tmpDir) {
      RakeHelper::doit "unzip -oqq #{tmpDir}/jasmine-standalone-2.0.0-rc2"
    }
    RakeHelper::doit "cp -r #{tmpDir}/lib/ #{targetDirectoryPath}"
  }

  $stdout.puts RakeHelper::green("✔ Jasmine deployed to #{targetDirectoryPath}")

end

#------------------------------------------------------------------------------
desc 'Exports all dependencies required to run the client in offline mode'
task 'deploy:offline' do
  deployJasmine "#{RakeHelper::projectRoot}/client/lib"
end


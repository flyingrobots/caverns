require "#{File.dirname(__FILE__)}/rake_helper"

=begin

# Jasmine

Jasmine is a behavior-driven development framework for testing JavaScript
code. It does not rely on the DOM or require any other JavaScript frameworks,
and is therefore suitable for testing both the client and server code.

For more information, see [Jasmine](http://pivotal.github.io/jasmine/)

## Deployment Steps:

1. Clone the Jasmine git repo to a temporary directory
2. Unzip the release candidate zip
4. Copy the contents of the unzipped 'lib' directory to the deployment target directory

=end

def deployJasmine targetDirectoryPath

  # TODO maybe this check isn't robust enough, but it will do for now...
  if File.exist? "#{targetDirectoryPath}/jasmine-2.0.0-rc2/jasmine.js"
    $stdout.puts "(jasmine has already been deployed to #{targetDirectoryPath})"
    return
  end

  $stdout.puts RakeHelper::blue("== Deploying Jasmine ==")

  tmpDir = "/tmp/caverns_rake/deploy/jasmine"
  RakeHelper::doit "rm -rf #{tmpDir}; mkdir -p #{tmpDir}"

  Dir.chdir(tmpDir) {
    $stdout.puts "(working in #{tmpDir})"
    RakeHelper::doit "git clone https://github.com/pivotal/jasmine.git git/"
    RakeHelper::doit "unzip -o git/dist/jasmine-standalone-2.0.0-rc2"
    RakeHelper::doit "cp -r lib/ #{targetDirectoryPath}"
  }

  RakeHelper::doit "rm -rf #{tmpDir}"

  $stdout.puts RakeHelper::green("✔ Jasmine deployed to #{targetDirectoryPath}")

end

#------------------------------------------------------------------------------
desc 'Exports all dependencies required to run the client in offline mode'
task 'deploy:offline' do
  deployJasmine "#{RakeHelper::projectRoot}/client/lib"
end

#------------------------------------------------------------------------------
desc 'Runs client tests'
task 'test:client' => ['deploy:offline'] do
  RakeHelper::doit "open #{RakeHelper::projectRoot}/client/SpecRunner.html"
end


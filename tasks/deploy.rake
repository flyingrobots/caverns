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

  $stdout.puts RakeHelper::blue("== Deploying Jasmine ==")

  # TODO maybe this check isn't robust enough, but it will do for now...
  if File.exist? "#{targetDirectoryPath}/jasmine-2.0.0-rc2/jasmine.js"
    
    $stdout.puts "○ Jasmine already deployed" 

  else

    tmpDir = "/tmp/caverns_rake/deploy/jasmine"
    RakeHelper::doit "rm -rf #{tmpDir}; mkdir -p #{tmpDir}"

    Dir.chdir(tmpDir) {
      $stdout.puts "(working in #{tmpDir})"
      RakeHelper::doit "git clone https://github.com/pivotal/jasmine.git git/"
      RakeHelper::doit "unzip -o git/dist/jasmine-standalone-2.0.0-rc2"
      RakeHelper::doit "cp -r lib/ #{targetDirectoryPath}"
    }

    RakeHelper::doit "rm -rf #{tmpDir}"

  end

  $stdout.puts RakeHelper::green("✔ Jasmine deployed to #{targetDirectoryPath}")

end

=begin

# Underscore

Underscore is a lightweight JavaScript utility belt library. For more
information, see [underscorejs.org](http://underscorejs.org/).

## Deployment Steps

1. Download a copy of underscore-min.js to the target directory path.

=end

def deployUnderscoreJS targetDirectoryPath

  $stdout.puts RakeHelper::blue("== Deploying UnderscoreJS ==")
  
  underscoreFilepath = "#{targetDirectoryPath}/underscore-min.js"

  unless File.exist? underscoreFilepath 
    RakeHelper::doit "curl -o #{targetDirectoryPath}/underscore-min.js http://underscorejs.org/underscore-min.js"
  else
    $stdout.puts "○ UnderscoreJS already deployed"
  end

  $stdout.puts RakeHelper::green("✔ Downloaded to #{targetDirectoryPath}/underscore-min.js")

end

=begin

# js-signals

An event system library.

## Deployment Steps

1. Download zip file to a temporary directory.
2. Unzip.
3. Copy to target directory path.

=end

def deployJsSignals targetDirectoryPath

  $stdout.puts RakeHelper::blue("== Deploying js-signals ==")

  if File.exist? "#{targetDirectoryPath}/signals.min.js"
    $stdout.puts "(js-signals already deployed)"
  else
    tmpDir = "/tmp/caverns_rake/deploy/js-signals"
    RakeHelper::doit "rm -rf #{tmpDir}; mkdir -p #{tmpDir}"
    Dir.chdir(tmpDir) {
      RakeHelper::doit "git clone https://github.com/millermedeiros/js-signals.git ."
      RakeHelper::doit "cp dist/signals.min.js #{targetDirectoryPath}"
    }
    RakeHelper::doit "rm -rf #{tmpDir}"
  end

  $stdout.puts RakeHelper::green("✔ Deployed js-signals to #{targetDirectoryPath}/signals.min.js")

end

#------------------------------------------------------------------------------
desc 'Exports all dependencies required to run the client in offline mode'
task 'deploy:offline' do
  clientLibPath = "#{RakeHelper::projectRoot}/client/lib"
  deployJasmine clientLibPath
  deployUnderscoreJS clientLibPath
  deployJsSignals clientLibPath
end

#------------------------------------------------------------------------------
desc 'Runs client tests'
task 'test:client' => ['deploy:offline'] do
  RakeHelper::doit "open #{RakeHelper::projectRoot}/client/SpecRunner.html"
end


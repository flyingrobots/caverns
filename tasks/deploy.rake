require "#{File.dirname(__FILE__)}/rake_helper"

def alreadyDeployed? name, deploymentPath
  if File.exist? deploymentPath
    $stdout.puts "○ #{name} is already deployed" 
    return true
  else
    return false 
  end
end

def deploy name, targetPath, &block
  $stdout.puts RakeHelper::blue("== Deploying #{name} ==")
  $stdout.puts "(to #{targetPath})"

  unless alreadyDeployed?(name, targetPath)
    yield block
  end

  $stdout.puts RakeHelper::green("✔ #{name} deployed to #{targetPath}")
end

def deployJasmine targetPath
  deploy('Jasmine', "#{targetPath}/jasmine-2.0.0-rc2") {
    tmpDir = "/tmp/caverns_rake/deploy/jasmine"
    RakeHelper::doit "rm -rf #{tmpDir}; mkdir -p #{tmpDir}"

    Dir.chdir(tmpDir) {
      $stdout.puts "(working in #{tmpDir})"
      RakeHelper::doit "git clone https://github.com/pivotal/jasmine.git git/"
      RakeHelper::doit "unzip -o git/dist/jasmine-standalone-2.0.0-rc2"
      RakeHelper::doit "cp -r lib/ #{targetPath}"
    }

    RakeHelper::doit "rm -rf #{tmpDir}"
  }
end

def deployUnderscoreJS targetPath
  underscoreFilepath = "#{targetPath}/underscore-min.js"
  deploy('Underscore js', underscoreFilepath) {
    RakeHelper::doit "curl -o #{underscoreFilepath} http://underscorejs.org/underscore-min.js"
  }
end

def deployJsSignals targetPath
  signalsFilepath = "#{targetPath}/signals.min.js"
  deploy('signals', signalsFilepath) {
    tmpDir = "/tmp/caverns_rake/deploy/js-signals"
    RakeHelper::doit "rm -rf #{tmpDir}; mkdir -p #{tmpDir}"
    Dir.chdir(tmpDir) {
      RakeHelper::doit "git clone https://github.com/millermedeiros/js-signals.git ."
      RakeHelper::doit "cp dist/signals.min.js #{targetPath}"
    }
    RakeHelper::doit "rm -rf #{tmpDir}"
  }
end

def deployBox2d targetPath
  box2dPath = "#{targetPath}/box2d.js"
  deploy('Box2d', box2dPath) {
    # TODO download this for reals
    RakeHelper::doit "cp #{RakeHelper::projectRoot}/client/deps/box2d-js/ #{targetPath}"
  }
end

desc 'Exports all dependencies required to run the client in offline mode'
task 'deploy:offline' do
  libDirPath = "#{RakeHelper::projectRoot}/client/lib"
  deployJasmine libDirPath
  deployUnderscoreJS libDirPath
  deployJsSignals libDirPath
  deployBox2d libDirPath
end

desc 'Runs client tests'
task 'test:client' => ['deploy:offline'] do
  $stdout.puts RakeHelper::blue("== Opening SpecRunner.html ==")
  RakeHelper::doit "open #{RakeHelper::projectRoot}/client/SpecRunner.html"
end


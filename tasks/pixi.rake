@script_dir = File.expand_path File.dirname(__FILE__)

require "#{@script_dir}/utils.rb"

def pixi_install_deps
  Dir.chdir "#{Utils.project_dir}/client/deps/pixi-js.git/" do
    sudoit "npm install -g grunt-cli"
    sudoit "npm install"
  end
end

def pixi_copy_bin_to dir
  doit "rm -r #{dir}/pixi-js"
  doit "mkdir #{dir}/pixi-js"
  doit "cp -r #{Utils.project_dir}/client/deps/pixi-js.git/examples #{dir}/pixi-js/examples/"
  doit "cp -r #{Utils.project_dir}/client/deps/pixi-js.git/bin #{dir}/pixi-js/bin/"
end

def pixi_update
  Dir.chdir "#{Utils.project_dir}/client/deps/pixi-js.git/" do
    doit "grunt"
    pixi_copy_bin_to "#{Utils.project_dir}/client/deps"
    pixi_copy_bin_to "#{Utils.project_dir}/sandbox/deps"
    Utils.gitnuke
  end
end

namespace :pixi do

  desc 'Installs pixi dependencies'
  task :install_pixi_deps do
    pixi_install_deps
  end

  desc 'Installs pixi dependencies and updates pixi examples and binary files'
  task :install => [:install_pixi_deps] do
    pixi_update
  end

  desc 'Updates pixi examples and binary files'
  task :update => [:install_pixi_deps] do
    pixi_update
  end
end

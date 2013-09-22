require "#{File.dirname(__FILE__)}/rake_helper"

#------------------------------------------------------------------------------
def pixi_install_deps
  Dir.chdir "#{RakeHelper::project_dir}/client/deps/pixi-js.git/" do
    RakeHelper::sudoit "npm install -g grunt-cli"
    RakeHelper::sudoit "npm install"
  end
end

#------------------------------------------------------------------------------
def pixi_copy_bin_to dir
  RakeHelper::doit "rm -r #{dir}/pixi-js"
  RakeHelper::doit "mkdir #{dir}/pixi-js"
  RakeHelper::doit "cp -r #{RakeHelper::project_dir}/client/deps/pixi-js.git/examples #{dir}/pixi-js/examples/"
  RakeHelper::doit "cp -r #{RakeHelper::project_dir}/client/deps/pixi-js.git/bin #{dir}/pixi-js/bin/"
end

#------------------------------------------------------------------------------
def pixi_update
  Dir.chdir "#{RakeHelper::project_dir}/client/deps/pixi-js.git/" do
    RakeHelper::doit "grunt"
    pixi_copy_bin_to "#{RakeHelper::project_dir}/client/deps"
    pixi_copy_bin_to "#{RakeHelper::project_dir}/sandbox/deps"
    RakeHelper::GitHelper.gitnuke
  end
end

###############################################################################

namespace :pixi do

  #----------------------------------------------------------------------------
  desc 'Installs pixi dependencies'
  task :install_pixi_deps do
    pixi_install_deps
  end

  #----------------------------------------------------------------------------
  desc 'Installs pixi dependencies and updates pixi examples and binary files'
  task :install => [:install_pixi_deps] do
    pixi_update
  end

  #----------------------------------------------------------------------------
  desc 'Updates pixi examples and binary files'
  task :update => [:install_pixi_deps] do
    pixi_update
  end

end


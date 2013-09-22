require "#{File.dirname(__FILE__)}/rake_helper"

#------------------------------------------------------------------------------
def npm_install path
  Dir.chdir path do
    RakeHelper::sudoit "npm install"
  end
end

#------------------------------------------------------------------------------
def npm_update path
  Dir.chdir path do
    RakeHelper::sudoit "npm update"
  end
end

#------------------------------------------------------------------------------
def discover_nodejs_deps
  nodejs_submodules = []
  Dir.glob("#{Utils.project_dir}/**/package.json").each do |npm_package|
    nodejs_submodules << npm_package.gsub(/\/package.json/, "")
  end
  return nodejs_submodules
end

#------------------------------------------------------------------------------
def each_nodejs_dep
  discover_nodejs_deps().each do |dep|
    $stdout.puts "(working in #{dep})"
    yield dep
  end
end

###############################################################################
namespace :node do

  #----------------------------------------------------------------------------
  desc 'Updates nodejs and npm to the latest stable version'
  task :update_nodejs do
    $stdout.puts RakeHelper::blue("== Updating nodejs ==")
    RakeHelper::sudoit "npm cache clean -f"
    RakeHelper::sudoit "npm install -g n"
    RakeHelper::sudoit "n stable"
    $stdout.puts RakeHelper::green("✔ Updated nodejs")
  end

  #----------------------------------------------------------------------------
  desc 'Updates dependencies recursively'
  task :update => [:update_nodejs] do
    each_nodejs_dep do |dep|
      npm_update dep
    end
  end

  #----------------------------------------------------------------------------
  desc 'Installs dependencies recursively'
  task :install => [:update_nodejs] do
    each_nodejs_dep do |dep|
      npm_install dep
    end
  end

end


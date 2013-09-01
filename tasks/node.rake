@script_dir = File.expand_path File.dirname(__FILE__)

require "#{@script_dir}/utils.rb"

def npm_install path
  Dir.chdir path do
    doit "sudo npm install"
  end
end

def npm_update path
  Dir.chdir path do
    doit "sudo npm update"
  end
end

def discover_nodejs_deps
  nodejs_submodules = []
  Dir.glob("#{Utils.project_dir}/**/package.json").each do |npm_package|
    nodejs_submodules << npm_package.gsub(/\/package.json/, "")
  end
  return nodejs_submodules
end

def each_nodejs_dep
  discover_nodejs_deps().each do |dep|
    $stdout.puts "(Working in #{dep})"
    yield dep
  end
end

namespace :node do

  desc 'Updates nodejs and npm to the latest stable version'
  task :update_nodejs do
    $stdout.puts "You may be prompted for your system password."
    doit "sudo npm cache clean -f"
    doit "sudo npm install -g n"
    doit "sudo n stable"
  end

  desc 'Updates dependencies recursively'
  task :update => [:update_nodejs] do
    each_nodejs_dep do |dep|
      npm_update dep
    end
  end

  desc 'Installs dependencies recursively'
  task :install => [:update_nodejs] do
    each_nodejs_dep do |dep|
      npm_install dep
    end
  end

end

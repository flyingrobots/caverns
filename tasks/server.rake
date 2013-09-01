@script_dir = File.expand_path File.dirname(__FILE__)

require "#{@script_dir}/utils.rb"

namespace :server do

  desc 'Spins up a local server'
  task :start do
    doit "node #{Utils.project_dir}/server/src/app.js"
  end

end

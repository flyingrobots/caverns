@script_dir = File.expand_path File.dirname(__FILE__)

require "#{@script_dir}/utils.rb"

def openChrome url
  doit "osascript #{Utils.project_dir}/scripts/open_chrome.scpt", :quiet => true
end

namespace :server do

  desc 'Spins up a local server'
  task :start do
    doit "node #{Utils.project_dir}/server/src/app.js"
  end

  desc 'Spins up a sandbox server'
  task :sandbox do
    t = Thread.new {
      system "sleep 2"
      openChrome "http://localhost:1337"
    }
    doit "node #{Utils.project_dir}/server/src/app.js sandbox"
    t.join
  end

end

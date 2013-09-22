require "#{File.dirname(__FILE__)}/rake_helper"

#------------------------------------------------------------------------------
def openChrome url
  RakeHelper::doit "osascript #{RakeHelper::project_dir}/scripts/open_chrome.scpt", :quiet => true
end

###############################################################################

namespace :server do

  #----------------------------------------------------------------------------
  desc 'Spins up a local server'
  task :start do
    RakeHelper::doit "node #{RakeHelper::project_dir}/server/src/app.js"
  end

  #----------------------------------------------------------------------------
  desc 'Spins up a sandbox server'
  task :sandbox do
    t = Thread.new {
      system "sleep 2"
      openChrome "http://localhost:1337"
    }
    RakeHelper::doit "node #{RakeHelper::project_dir}/server/src/app.js sandbox"
    t.join
  end

end


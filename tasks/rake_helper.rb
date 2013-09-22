require 'stringio'
require 'fileutils'

# TODO: Consider making "doit" and "sudoit" more useful by capturing the
# result from the system call... maybe add some options to run the command
# on another thread or in a child process?

module RakeHelper

  #----------------------------------------------------------------------------
  def self.yellow message
    "\e[33m#{message}\e[0m"
  end

  #----------------------------------------------------------------------------
  def self.blue message
    "\e[34m#{message}\e[0m"
  end

  #----------------------------------------------------------------------------
  def self.green message
    "\e[32m#{message}\e[0m"
  end

  #----------------------------------------------------------------------------
  def self.red message
    "\e[31m#{message}\e[0m"
  end

  #----------------------------------------------------------------------------
  def self.doit command, opts = {}
    if opts[:quiet]
      system "#{command} > /dev/null"
    else
      $stdout.puts "#{command}"
      system "#{command}"
    end
  end

  #----------------------------------------------------------------------------
  def self.sudoit command, opts = {}
    $stdout.puts "You may be prompted for your system password."
    $stdout.puts opts[:desc] if opts.has_key? :desc
    $stdout.puts "sudo #{command}"
    system "sudo #{command}"
  end

  #----------------------------------------------------------------------------
  def self.projectRoot
    File.expand_path "#{File.dirname(__FILE__)}/../"
  end

  #----------------------------------------------------------------------------
  def self.capture_stdout command
    #$stdout.puts "#{command}"
    prevstdout, $stdout = $stdout, StringIO.new
    RakeHelper::doit command
    $stdout.string
  ensure
    $stdout = prevstdout
  end

  #----------------------------------------------------------------------------
  def self.capture_result command
    # I'm sure there's a better way to do this, but I'm in a hurry
    RakeHelper::capture_stdout "#{command}; printf $?"
  end

  #----------------------------------------------------------------------------
  def self.blowUp message
    $stderr.puts message
    raise message
  end

  #############################################################################
  class GitHelper

    #--------------------------------------------------------------------------
    def self.dirtyStage?
      RakeHelper::capture_result("git diff-index --cached --quiet HEAD") == "1"
    end

    #--------------------------------------------------------------------------
    def self.dirtyWorkingTree?
      RakeHelper::capture_result("git diff-files --quiet") == "1"
    end

    #--------------------------------------------------------------------------
    def self.onBranch? branch
      # TODO
    end

    #--------------------------------------------------------------------------
    def self.safeSwitchToBranch branch
      if GitHelper.dirtyStage?
        RakeHelper::blowUp "Git stage is dirty. Commit or stash and try again."
      end

      if GitHelper.dirtyWorkingTree?
        RakeHelper::blowUp "Git working tree is dirty. Commit or stash and try again."
      end

      RakeHelper::doit "git checkout #{branch}"
    end

    #--------------------------------------------------------------------------
    def self.syncWithOrigin branch
      $stdout.puts "(git is working in #{Dir.getwd})"
      
      GitHelper.safeSwitchToBranch branch #unless GitHelper::onBranch? branch
      
      RakeHelper::doit "git fetch && git pull origin #{branch} && git submodule update --init --recursive"
    end

    #--------------------------------------------------------------------------
    def self.nuke
      RakeHelper::doit "git checkout . && git clean -df"
    end

    #--------------------------------------------------------------------------
    def self.obliterate
      $stdout.puts RakeHelper::red("☠ Obliterating files ignored by git and cleaning in #{Dir.getwd}")
      RakeHelper::doit "git clean -dfx"
      $stdout.puts RakeHelper::green("✔ #{Dir.getwd} git repo is now pristine")
    end

    #--------------------------------------------------------------------------
    def self.purge
      $stdout.puts RakeHelper::yellow("⚠ Removing files ignored by git in #{Dir.getwd}")
      RakeHelper::doit "git clean -fX"
    end

 end

end

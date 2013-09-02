require 'stringio'

class Utils
  def self.project_dir
    File.expand_path "#{File.expand_path File.dirname(__FILE__)}/../"
  end

  def self.gitnuke 
    doit "git checkout . && git clean -df"
  end
end

def doit command, opts = {}
  if opts[:quiet]
    system "#{command} > /dev/null"
  else
    $stdout.puts "#{command}"
    system "#{command}"
  end
end

def sudoit command, opts = {}
  $stdout.puts "You may be prompted for your system password."
  $stdout.puts opts[:desc] if opts.has_key? :desc
  $stdout.puts "sudo #{command}"
  system "sudo #{command}"
end

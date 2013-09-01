class Utils
  def self.project_dir
    File.expand_path "#{File.expand_path File.dirname(__FILE__)}/../"
  end
end

def doit command, opts = {}
  $stdout.puts opts[:desc] if opts.has_key? :desc
  $stdout.puts "#{command}"
  system "#{command}"
end

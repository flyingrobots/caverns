#!/usr/bin/env ruby
command = 'cp -r Markdown/ "~/Library/Application\ Support/Sublime\ Text\ 2/Packages/Markdown"'

$stdout.puts "#{command}"

system command

$stdout.puts "Sweet."

#!/usr/bin/env ruby
# w2go.rb, the main Sinatra app for w2go.

require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, {:format => :html5}

get '/' do
  haml :base
end

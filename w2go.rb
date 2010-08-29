#!/usr/bin/env ruby
# w2go.rb, the main Sinatra app for w2go.

require 'rubygems'
require 'sinatra'
require 'haml'

set :haml, {:format => :html5}
set :public, File.dirname(__FILE__) + "/public"
set :views, File.dirname(__FILE__) + "/views"
set :run, true

get '/' do
  haml :base
end

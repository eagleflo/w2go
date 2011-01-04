#!/usr/bin/env ruby
# w2go.rb, the main Sinatra app for w2go.

require 'sinatra'
require 'haml'

set :haml, {:format => :html5}
set :run, true

get '/' do
  haml :base
end

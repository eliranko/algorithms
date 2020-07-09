# frozen_string_literal: true

class PathsChannel < ApplicationCable::Channel
  def subscribed
    puts 'subed!'
    stream_from 'paths'
  end
end

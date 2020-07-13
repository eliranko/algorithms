# frozen_string_literal: true

class PathsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'paths'
  end
end

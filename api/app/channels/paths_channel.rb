# frozen_string_literal: true

class PathsChannel < ApplicationCable::Channel
  def subscribed
    stream_for user
  end
end

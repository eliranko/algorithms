# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    post 'path_finder/find'
  end

  mount ActionCable.server => '/cable'
end

# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    post 'path_finder/find'
    post 'register', to: 'authentication#register'
    post 'login', to: 'authentication#login'

    resources :users
  end

  mount ActionCable.server => '/cable'
end

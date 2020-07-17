# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  private

  def authenticate
    render status: 401 unless authenticate_token
    true
  end

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      @token = Auth::Jwt.decode(token)
    end
  end
end

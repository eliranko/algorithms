# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user

    def connect
      @user = find_user
    end

    private

    def find_user
      reject_unauthorized_connection unless authenticate_token && (user = User.find(@token.first['userID']))
      user
    end

    def authenticate_token
      @token = Auth::Jwt.decode(request.query_parameters['token'])
    end
  end
end

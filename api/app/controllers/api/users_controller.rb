# frozen_string_literal: true

class Api::UsersController < ApplicationController
  before_action :authenticate

  def show
    token_user_id = @token.first['userID']
    unless token_user_id == params[:id].to_i
      return render json: { message: 'mismatching token and user id' }, status: 400
    end

    render json: { user: User.find(token_user_id) }, status: :ok
  end

  private

  def authenticate
    render stauts: 400 unless authenticate_token
    true
  end

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      @token = Auth::Jwt.decode(token)
    end
  end
end

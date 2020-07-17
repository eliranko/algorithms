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
end

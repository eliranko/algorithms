# frozen_string_literal: true

require 'http'

class Api::AuthenticationController < ApplicationController
  def register
    return form_registration if params[:type] == 'form'

    google_registration
  end

  def login
    return form_login if params[:type] == 'form'

    google_login
  end

  private

  def form_login
    user = User.find_by(email: params[:email])
    return render json: { message: 'invalid email' }, status: 400 if user.nil?
    return render json: { message: 'invalid password' }, stauts: 400 unless user.authenticate(params[:password])

    render json: { token: Auth::Jwt.encode(user.id) }, status: :ok
  end

  def google_login
    return render json: { message: 'authentication failed' }, status: 400 unless google_validation

    user = User.find_by(email: params[:email])
    return render json: { message: 'invalid email' }, status: 400 if user.nil?

    render json: { token: Auth::Jwt.encode(user.id) }, status: :ok
  end

  def form_registration
    res = HTTP.post('https://www.google.com/recaptcha/api/siteverify', form: {
                      secret: '6Le-BrAZAAAAAEGa0oz5dlsfAxPR9IEkcVzZutaV',
                      response: params['recaptcha']
                    })

    return render json: { message: 'captcha failure' }, status: 400 unless eval(res.to_s)[:success]

    create_user(params[:email], params[:password])
  end

  def google_registration
    return render json: { message: 'authentication failed' }, status: 400 unless google_validation

    create_user(params[:email], SecureRandom.hex(9))
  end

  def google_validation
    res = HTTP.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params[:token]}")
    res.status.success? && eval(res.to_s)[:aud] == '118125402303-4bpg5nf80olg1pnr4plej9qd2a9ulrmg.apps.googleusercontent.com'
  end

  def create_user(email, password)
    user = User.new({ email: email, password: password })
    return render json: { token: Auth::Jwt.encode(user.id) }, status: :ok if user.save

    render json: { message: 'user creation error' }, status: 400
  end
end

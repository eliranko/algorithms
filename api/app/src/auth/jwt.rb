# frozen_string_literal: true

class Auth::Jwt
  @@secret = 'my$ecretK3y'
  @@algorithm = 'HS256'

  def self.encode(id)
    payload = { userID: id, exp: Time.now.to_i + 3600 }
    JWT.encode payload, @@secret, @@algorithm
  end

  def self.decode(token)
    JWT.decode token, @@secret, true, { algorithm: @@algorithm }
  rescue JWT::ExpiredSignature
    nil
  end

  def self.valid?(token)
    !decode(token).nil?
  end
end

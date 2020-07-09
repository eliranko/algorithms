# frozen_string_literal: true

class Point < ApplicationRecord
  belongs_to :path_request

  validates :x, presence: true, numericality: { only_integer: true }
  validates :y, presence: true, numericality: { only_integer: true }
end

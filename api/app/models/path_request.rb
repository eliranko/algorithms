# frozen_string_literal: true

class PathRequest < ApplicationRecord
  has_many :points, dependent: :destroy
  has_one :grid, dependent: :destroy

  validates_length_of :points, maximum: 2, minimum: 2
  validates_associated :points, :grid

  accepts_nested_attributes_for :points, :grid
end

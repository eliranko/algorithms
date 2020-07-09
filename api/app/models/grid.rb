# frozen_string_literal: true

class Grid < ApplicationRecord
  belongs_to :path_request

  validates :rows, presence: true, numericality: { only_integer: true }
  validates :cols, presence: true, numericality: { only_integer: true }
end

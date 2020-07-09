# frozen_string_literal: true

class Api::PathFinderController < ApplicationController
  def find
    req = PathRequest.create(path_request_params)
    render json: { message: 'Validation failed', errors: req.errors }, status: 400 unless req.valid?

    PathWorker.perform_async(req.id)
    render json: {}, status: 200
  end

  private

  def path_request_params
    params.permit(grid_attributes: %i[rows cols], points_attributes: %i[x y])
  end
end

# frozen_string_literal: true

require_relative 'algorithms/bfs_finder.rb'

class PathWorker
  include Sidekiq::Worker

  def initialize
    @queue = []
    @visited = Set.new
  end

  def perform(path_req_id, metric, user_id)
    path_req = PathRequest.find(path_req_id)
    return if path_req.nil?

    Algorithms::TaxicabBfsFinder.new.find(path_req, user_id) if metric == 'taxicab'
    Algorithms::EuclideanBfsFinder.new.find(path_req, user_id) if metric == 'euclidean'
    path_req.destroy
  end
end

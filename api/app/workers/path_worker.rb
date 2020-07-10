# frozen_string_literal: true

require_relative 'bfs_finder.rb'

class PathWorker
  include Sidekiq::Worker

  def initialize
    @queue = []
    @visited = Set.new
  end

  def perform(path_req_id, metric)
    path_req = PathRequest.find(path_req_id)
    return if path_req.nil?

    TaxicabBfsFinder.new.find(path_req) if metric == 'taxicab'
    EuclideanBfsFinder.new.find(path_req) if metric == 'euclidean'
    path_req.destroy
  end
end

# frozen_string_literal: true

class PathWorker
  include Sidekiq::Worker

  def initialize
    @queue = []
    @visited = Set.new
  end

  def perform(path_req_id)
    @queue = []
    @visited = Set.new

    path_req = PathRequest.find(path_req_id)
    return if path_req.nil?

    @rows = path_req.grid.rows
    @cols = path_req.grid.cols
    points = path_req.points

    print "finding shortes path for #{@rows}x#{@cols} grid with points "
    puts "#{points[0].x}:#{points[0].y}, #{points[1].x}:#{points[1].y}"

    @queue << TempPoint.new(points[0].x, points[0].y)
    while @queue.any?
      point = @queue.shift
      if point == points[1]
        result = []
        until point.nil?
          result << point
          point = point.parent
        end

        broadcast_action({ points: result.reverse, done: true })
        return
      end

      broadcast_action({ points: [point], done: false })

      add_point_to_queue(point.x + 1, point.y, point)
      add_point_to_queue(point.x - 1, point.y, point)
      add_point_to_queue(point.x, point.y + 1, point)
      add_point_to_queue(point.x, point.y - 1, point)
    end

    # PathRequest.destroy(path_req_id)
    puts 'done'
  end

  def broadcast_action(data)
    ActionCable.server.broadcast 'paths', data
  end

  def add_point_to_queue(x, y, parent)
    puts "trying to add #{x}:#{y}"
    return unless (0...@rows) === x && (0...@cols) === y

    child_point = TempPoint.new(x, y, parent)
    return if @visited.include?(child_point)

    puts "adding point #{child_point}"
    @visited.add(child_point)
    @queue << child_point
  end
end

class TempPoint
  attr_accessor :x, :y, :parent

  def initialize(x, y, parent = nil)
    @x = x
    @y = y
    @parent = parent
  end

  def ==(other)
    @x == other.x && @y == other.y
  end

  alias eql? ==

  def hash
    "#{@x}:#{@y}".hash
  end

  def as_json(_options)
    { x: @x, y: @y }
  end
end

# frozen_string_literal: true

class BfsFinder
  def initialize
    @queue = []
    @visited = Set.new
  end

  def find(path_request)
    @rows = path_request.grid.rows
    @cols = path_request.grid.cols
    points = path_request.points

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
        break
      end

      broadcast_action({ points: [point], done: false })

      next_round(point)
    end
  end

  def broadcast_action(data)
    ActionCable.server.broadcast 'paths', data
  end

  def add_point_to_queue(x, y, parent)
    return unless (0...@rows) === x && (0...@cols) === y

    child_point = TempPoint.new(x, y, parent)
    return if @visited.include?(child_point)

    @visited.add(child_point)
    @queue << child_point
  end
end

class TaxicabBfsFinder < BfsFinder
  def next_round(point)
    add_point_to_queue(point.x + 1, point.y, point)
    add_point_to_queue(point.x - 1, point.y, point)
    add_point_to_queue(point.x, point.y + 1, point)
    add_point_to_queue(point.x, point.y - 1, point)
  end
end

class EuclideanBfsFinder < TaxicabBfsFinder
  def next_round(point)
    super
    add_point_to_queue(point.x + 1, point.y + 1, point)
    add_point_to_queue(point.x - 1, point.y + 1, point)
    add_point_to_queue(point.x - 1, point.y - 1, point)
    add_point_to_queue(point.x + 1, point.y - 1, point)
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

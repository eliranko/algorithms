class AddPathRequestToPoint < ActiveRecord::Migration[6.0]
  def change
    add_reference :points, :path_request, null: false, foreign_key: true
  end
end

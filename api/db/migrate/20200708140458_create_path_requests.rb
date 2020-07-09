class CreatePathRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :path_requests do |t|

      t.timestamps
    end
  end
end

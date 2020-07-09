class CreateGrids < ActiveRecord::Migration[6.0]
  def change
    create_table :grids do |t|
      t.integer :rows
      t.integer :cols

      t.timestamps
    end
  end
end

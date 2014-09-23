class CreateTmaps < ActiveRecord::Migration
  def change
    create_table :tmaps do |t|
      t.string :name
      t.string :classification
      t.string :coordinate_lat
      t.string :coordinat_lon

      t.timestamps
    end
  end
end

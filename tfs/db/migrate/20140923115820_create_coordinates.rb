class CreateCoordinates < ActiveRecord::Migration
  def change
    create_table :coordinates do |t|
      t.references :shelter, index: true
      t.string :lat
      t.string :lon

      t.timestamps
    end
  end
end

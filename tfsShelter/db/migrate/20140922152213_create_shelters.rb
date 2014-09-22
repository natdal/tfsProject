class CreateShelters < ActiveRecord::Migration
  def change
    create_table :shelters do |t|
      t.string :name
      t.text :introduction
      t.string :classification
      t.string :grade
      t.string :cooldinate_lat
      t.string :cooldinate_lon

      t.timestamps
    end
  end
end

class AddTmapinIdToShelters < ActiveRecord::Migration
  def change
    add_column :shelters, :shelter_id, :Integer
    add_index :shelters, :shelter_id
  end
end

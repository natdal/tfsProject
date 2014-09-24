class CreateShelters < ActiveRecord::Migration
  def change
    create_table :shelters do |t|
      t.string :name
      t.string :introduce
      t.string :lan
      t.string :lon

      t.timestamps
    end
  end
end

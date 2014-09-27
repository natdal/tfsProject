class AddIndexToBaskets < ActiveRecord::Migration
  def change
  	 add_index :carts, :user_id, unique: true
  end
end

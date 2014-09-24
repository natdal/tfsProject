class AaddUserIdToShelters < ActiveRecord::Migration
  def change
  	add_colunm :shelters , :user_id, :integer 
  end
end

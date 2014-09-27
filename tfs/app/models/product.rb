class Product < ActiveRecord::Base
	belongs_to :user
	has_many :orders
	default_scope -> { order('created_at DESC') }
	mount_uploader :picture, PictureUploader
	mount_uploader :picture2, PictureUploader
	mount_uploader :picture3, PictureUploader
	validates :user_id, presence: true
	validates :name, presence: true
	validates :price, numericality: true
	validate :picture_size
	


	private
	def picture_size
      if picture.size > 5.megabytes
        errors.add(:picture, "should be less than 5MB")
      end
    end
end

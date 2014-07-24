class AddAttachmentLocationPhotoToLocations < ActiveRecord::Migration
  def self.up
    change_table :locations do |t|
      t.attachment :location_photo
    end
  end

  def self.down
    remove_attachment :locations, :location_photo
  end
end

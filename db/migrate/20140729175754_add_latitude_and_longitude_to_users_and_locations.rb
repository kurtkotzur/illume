class AddLatitudeAndLongitudeToUsersAndLocations < ActiveRecord::Migration
  def change
    add_column :users, :latitude, :decimal
    add_column :users, :longitude, :decimal
    add_column :locations, :latitude, :decimal
    add_column :locations, :longitude, :decimal
  end
end

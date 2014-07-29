class ChangeLatitudeAndLongitudeToFloat < ActiveRecord::Migration
  def change
    change_column :users, :latitude, :float
    change_column :users, :longitude, :float
    change_column :locations, :latitude, :float
    change_column :locations, :longitude, :float
  end
end

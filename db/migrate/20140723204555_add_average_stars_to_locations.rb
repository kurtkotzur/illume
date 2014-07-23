class AddAverageStarsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :average_stars, :float
  end
end

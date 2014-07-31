class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :favorites, :user_id
    add_index :favorites, :location_id
    add_index :favorites, [:location_id, :user_id]
    add_index :reviews, :location_id
    add_index :reviews, :user_id
    add_index :days, :location_id
  end
end

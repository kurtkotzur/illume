class AddLocationIdToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :location_id, :integer, null: false
  end
end

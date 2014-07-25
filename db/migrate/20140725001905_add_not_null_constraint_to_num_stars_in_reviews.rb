class AddNotNullConstraintToNumStarsInReviews < ActiveRecord::Migration
  def change
    change_column :reviews, :num_stars, :integer, null: false
  end
end

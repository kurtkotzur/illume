class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.datetime :date, null: false
      t.text :body
      t.integer :num_stars
    end
  end
end

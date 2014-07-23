class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.integer :location_id, null: false
      t.string :day, null: false
      t.time :opening_time
      t.time :closing_time
      
      t.timestamps
    end
  end
end

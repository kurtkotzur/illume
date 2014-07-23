class RenameDayColumnInDays < ActiveRecord::Migration
  def change
    rename_column :days, :day, :name
  end
end

class AddDefaultValuesToBooleanColumns < ActiveRecord::Migration
  def change
    change_column :locations, :wifi, :boolean, default: false
    change_column :locations, :wheelchair_accessible, :boolean, default: false
  end
end

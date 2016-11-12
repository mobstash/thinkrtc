class AddFieldToHomes < ActiveRecord::Migration
  def change
    add_column :homes, :website, :string
    add_column :homes, :email, :string
  end
end

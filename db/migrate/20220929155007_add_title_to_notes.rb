class AddTitleToNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :title, :string
  end
end

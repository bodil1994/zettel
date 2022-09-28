class CreateRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :relationships do |t|
      t.integer :parent_id, foreign_key: true
      t.integer :child_id, foreign_key: true
      t.timestamps
    end
  end
end

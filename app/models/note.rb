class Note < ApplicationRecord
  belongs_to :user
  has_many :parent_relationships, foreign_key: :child_id, class_name: "Relationship"
  has_many :parents, through: :parent_relationships

  has_many :child_relationships, foreign_key: :parent_id, class_name: "Relationship"
  has_many :children, through: :child_relationships

  def descendants
    self.children | self.children.map(&:descendants).flatten
  end

  def ancestors
    self.parents | self.parents.map(&:ancestors).flatten
  end
end

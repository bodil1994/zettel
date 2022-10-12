class Note < ApplicationRecord
  include AlgoliaSearch
  algoliasearch do;
  end

  # after_create_commit { broadcast_append_to "note_#{self.note.id}_children", target: "post#{self.post.id}_comments" }

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

  # Depth only works 1 parent can have N children not N-N as currently set up in DB
  def depth
    self.ancestors.count
  end

  def siblings
    siblings = []
    self.parents.to_a.each do |parent|
      siblings << parent.children.excluding(self)
    end
    siblings
  end

  def root?
    self.parents.blank?
  end
end

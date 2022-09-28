class Relationship < ApplicationRecord
  belongs_to :parent, class_name: "Note"
  belongs_to :child, class_name: "Note"
end

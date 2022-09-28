require 'faker'
User.destroy_all
puts "destroyed old users"
Note.destroy_all
puts "destroyed old notes"
Relationship.destroy_all
puts "destroyed old relationships"

puts "creating users"
user_bodil = User.create(email: "bodil@hundevad.de", password: "123456")

puts "creating notes"
ruby = Note.create(user: user_bodil, content: "Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms.")
rails = Note.create(user: user_bodil, content: "Rails is a full-stack framework. It ships with all the tools needed to build amazing web apps on both the front and back end.")
rails_seed_faker = Note.create(user: user_bodil, content: 'require "faker" 100.times do Restaurant.create(name: Faker::Restaurant.new, ratings: 5) end' )
rails_new = Note.create(user: user_bodil, content: "Create a new rails file")
puts "#{Note.count} notes creates"

puts "creating relationships"
Relationship.create(parent: ruby, child: rails)
Relationship.create(parent: rails, child: rails_seed_faker)
Relationship.create(parent: rails, child: rails_new)
puts "#{Relationship.count} relationships creates"

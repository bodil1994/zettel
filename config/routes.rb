Rails.application.routes.draw do
  devise_for :users
  root to: "notes#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :notes
  get "/tree_data", to: "notes#tree_data", defaults: { format: 'json' }
  get "/test", to: "notes#test"
end

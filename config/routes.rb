Rails.application.routes.draw do
  get 'landing_page/home'
  get '/contact', to: 'landing_page#contact'
  root 'landing_page#home'
  post '/contact' , to: 'landing_page#create'
  get '/home' , to: 'landing_page#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

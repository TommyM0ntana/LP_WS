class LandingPageController < ApplicationController
  def home
  end

  def contact
  end

  def path 
    data = params[:content]
    subject=params[:number]
    user = params[:email]
    Mailer.mail_method(data,user,subject).deliver
  end
 
end

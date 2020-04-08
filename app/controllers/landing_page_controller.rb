class LandingPageController < ApplicationController
  def home
  end

  def contact
  end

  def create
    data = params[:contact][:content]
    number = params[:contact][:number]
    user = params[:contact][:email]
    OrderMailer.order_email(data,user,number).deliver_now
    redirect_to root_path
  end
 
end

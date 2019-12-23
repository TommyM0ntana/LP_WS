class OrderMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.order_mailer.order_email.subject
  #
  
    
    def order_email (data,user,number)
      @greeting = "Hi"
      @number = number
      @body = data
      @email = 'biodun9@gmail.com'
      mail(to: @email, from: user, subject: 'You have a new job order')
  end
end

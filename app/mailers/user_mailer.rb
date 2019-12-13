class UserMailer < ApplicationMailer
    #default from: params[:email]

    def order_email (data,user,number)
        @number = number
        @body = data
        @email = 'biodun9@gmail.com'
        mail(to: @email, from: user, subject: 'You have a new job order')
       
    end
end
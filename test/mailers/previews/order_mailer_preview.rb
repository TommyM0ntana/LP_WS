# Preview all emails at http://localhost:3000/rails/mailers/order_mailer
class OrderMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/order_mailer/order_email
  def order_email
data = 'I want a site for my hospital. Can you build one? Please contact me'
user = 'sarah@team54.com'
number = '+165749809'
    OrderMailer.order_email(data,user,number)
  end

end

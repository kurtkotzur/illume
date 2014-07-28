# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)      not null
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true, :uniqueness => true
  validates :username, :presence => true, :uniqueness => true

  before_validation :ensure_session_token
  
  has_attached_file :user_photo, styles: {
    big: "500x500",
    small: "250x250"
  }
  
  has_many(
    :reviews,
    class_name: "Review",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  has_many(
    :favorites,
    class_name: "Favorite",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy
  )
  
  has_many(
    :favorite_locations,
    through: :favorites,
    source: :location
  )
  
  validates_attachment_content_type :user_photo, content_type: /\Aimage\/.*\Z/

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end

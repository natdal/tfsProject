class User < ActiveRecord::Base
      has_many :microposts, dependent: :destroy
      has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
      has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy

      has_many :following, through: :active_relationships, source: :followed
      has_many :followers, through: :passive_relationships, source: :follower
      has_many :shelter, dependent: :destroy

     attr_accessor :remember_token, :activation_token , :reset_token #getter, setter 지정
     before_save :downcase_email   # user가 디비에 저장되기 전에 email 주소를 소문자로 변경
     before_create :create_activation_digest # user를 생성하기전 activation_digest를 생성
     
     validates :name, presence: true, length: { maximum: 50 }
      VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*\.[a-z]+\z/i
     validates :email, presence: true, format: { with: VALID_EMAIL_REGEX } ,  uniqueness: { case_sensitive: false }
     has_secure_password
     validates :password, length: { minimum: 6 }

    
     
      # Returns the hash digest of the given string.
    def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
    end
    
    def User.new_token
    SecureRandom.urlsafe_base64
    end
    
    def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
    end
    
    # Returns true if the given token matches the digest.
  def authenticated?(attribute, token)
   digest = send("#{attribute}_digest") 
   BCrypt::Password.new(digest).is_password?(token)
 # 만약 attribute = "activation" 이면 send("#{attribute}_digest") = "activation_digest"  

  end
  
   # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end
 # Activates an account.
  def activate
      self.update_attribute(:activated , true) # 활성화 속성을 true로 업데이트
      self.update_attribute(:activated_at, Time.zone.now) # 활성화된 시간
  end

  # Sends activation email.
  def send_activation_email
    UserMailer.account_activation(self).deliver
  end


  def create_reset_digest # 패스워드 변경을 위한 토큰 다이제스트 생성
    self .reset_token = User.new_token
    update_attribute(:reset_digest, User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.zone.now)

    
  end
    

    def send_password_reset_email # 패스워드 변경 이메일 전송
      UserMailer.password_reset(self).deliver
      
    end

  def password_reset_expired?
    self.reset_sent_at < 2.hours.ago # < 는 earlier than
  end

  # Follows a user.
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end

  # Returns a user's status feed.
  def feed
    Micropost.from_users_followed_by(self)
  end


  private

    # Converts email to all lower-case.
    def downcase_email
      self.email = email.downcase
    end

    # activation token 과 digest 생성
    def create_activation_digest
      self.activation_token  = User.new_token
      self.activation_digest = User.digest(activation_token)
    end

  

   

end



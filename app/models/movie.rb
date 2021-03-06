# == Schema Information
#
# Table name: movies
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  description    :text             not null
#  rating         :string           not null
#  content_length :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_movie     :boolean          default(FALSE)
#

class Movie < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :description, :rating, :content_length, presence: true

  has_many :movie_genres,
    foreign_key: :movie_id,
    class_name: :MovieGenre

  has_many :genres,
    through: :movie_genres,
    source: :genre

  has_many :user_movies,
    foreign_key: :movie_id,
    class_name: :UserMovie

  has_many :user,
    through: :user_movies,
    source: :user

  has_one_attached :image
  has_one_attached :trailer
  has_one_attached :movie
end

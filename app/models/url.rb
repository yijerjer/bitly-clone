class Url < ActiveRecord::Base
	validates :long_url, uniqueness: true, format: { with: URI::regexp }
	validates :short_url, uniqueness: true
	# This is Sinatra! Remember to create a migration!
	before_create do 
		self.short_url = self.shorten
	end

	def shorten
		all_chars = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
		string = (0...10).map { all_chars[rand(all_chars.length)] }.join
	end

end

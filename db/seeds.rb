# require 'csv'

# Url.transaction do
# 	urls = CSV.read('db/urls')

# 	urls.each_with_index do |row, index|
# 		p index
# 		row[0] = row[0][1..-2]

# 		all_chars = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
# 		string = (0...10).map { all_chars[rand(all_chars.length)] }.join
# 		row[1] = string
# 	end
	
# 	attr = [:long_url, :short_url]
# 	Url.import attr, urls, validate: true
# end
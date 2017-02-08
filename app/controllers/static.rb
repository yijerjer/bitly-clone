get '/' do
  @array = Url.all.limit(20).order(id: :desc)
  erb :"static/index"
end

post '/url' do
  # create a new Urll]
  new_url = Url.new(long_url: params[:long_url])
  if new_url.valid?
    new_url.save
    return new_url.to_json
  else
  	json_hash = {}
    json_hash[:error_msgs] = new_url.errors.messages[:long_url][0]

    if json_hash[:error_msgs] == "has already been taken"
    	find_url = Url.find_by(long_url: params[:long_url])
    	json_hash[:short_url] = find_url.short_url
    	json_hash[:long_url] = find_url.long_url
    end

    return json_hash.to_json
  end

  # if new_url.save
  #   redirect to '/'
  # else
  #   handle the error
  # end
end

# i.e. /q6bda
get '/:short_url' do
  # redirect to appropriate "long" URL
  row = Url.find_by(short_url: params[:short_url])
  row.click_count += 1
  row.save
  redirect row.long_url
end
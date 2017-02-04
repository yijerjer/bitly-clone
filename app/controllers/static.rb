get '/' do
  # let user create new short URL, display a list of shortened URLs
  if params["error"] == "is invalid"
    @error_msgs = "Invalid Address"
  elsif params["error"] == "has already been taken"
    @error_msgs = "A short link has already been created for this URL"
  else
    @error_msgs = nil
  end

  @array = Url.all
  erb :"static/index"
end

post '/' do
  # create a new Url
  new_url = Url.new(long_url: params[:long_url])
  if new_url.invalid?
    error_msgs = new_url.errors.messages[:long_url][0]
    redirect "/?error=#{error_msgs}"
  else
    new_url.save
    redirect "/"
  end
end

# i.e. /q6bda
get '/:short_url' do
  # redirect to appropriate "long" URL
  row = Url.find_by(short_url: params[:short_url])
  row.click_count += 1
  row.save
  redirect row.long_url
end
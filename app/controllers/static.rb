# get '/' do
#   erb :"static/index"
# end

get '/' do
  # let user create new short URL, display a list of shortened URLs
  @array = Url.all
  erb :"static/index"
end

post '/' do
  # create a new Url
  Url.create(long_url: params[:long_url])
  redirect "/"
end

# i.e. /q6bda
get '/:short_url' do
  # redirect to appropriate "long" URL
  row = Url.find_by(short_url: params[:short_url])
  redirect row.long_url
end
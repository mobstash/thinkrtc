json.extract! signup, :id, :email, :website, :created_at, :updated_at
json.url signup_url(signup, format: :json)
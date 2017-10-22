module SinatraServer
    class App < Sinatra::Base
      require 'sinatra'

        get '/hello' do
            [
                200,
                {
                    'Content-Type' => 'application/json'
                },
                {
                    hello: 'world'
                }.to_json
            ]
        end
    end
end

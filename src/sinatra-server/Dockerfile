FROM ruby:2.4

ENV APP_ROOT /usr/app
RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

ADD Gemfile* $APP_ROOT/
RUN bundle install

ADD . $APP_ROOT

EXPOSE 9292
CMD ["bundle", "exec", "shotgun", "config.ru", "-p", "9292", "-s", "thin", "-o", "0.0.0.0"]

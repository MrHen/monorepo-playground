# monorepo-playground
Playground for setting up different webservers using a docker monorepo

## Application

The basic application is a port of [MrHen/linkify](https://github.com/MrHen/linkify) which exposes a simple link shortener API.

The backend services should implement the _exact_ same REST behavior from inside a suitable Docker container. Behavior is verified using [integration tests](https://github.com/MrHen/monorepo-playground/tree/master/src/e2e).

Frontend implementations are minimal prototypes built to interact with the linkify API.

## Tests

```bash
docker-compose run --rm e2e
```

## Services

### django-server

* [Python 3.6](https://docs.python.org/3/)
* [Django](https://www.djangoproject.com/)

### express-server

* [TypeScript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)

### react-antd-js-client

#### Quickstart

* `docker-compose up -d react-antd-js-client`
* Visit `http://0.0.0.0:3000/`

#### Technology

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
* [React](https://reactjs.org/)
* [Create React App](https://github.com/facebook/create-react-app)
* [Ant Design](https://ant.design/)

### sinatra-server

* [Ruby](https://www.ruby-lang.org/en/)
* [Sinatra](http://sinatrarb.com/)

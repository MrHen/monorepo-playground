FROM python:3.6-stretch

RUN pip3 install -U vex
WORKDIR /usr/app

COPY ./requirements.pip .
RUN vex --make djangoenv pip3 install -r requirements.pip

COPY . /usr/app

EXPOSE 8000
ENTRYPOINT [ "vex", "djangoenv" ]
CMD [ "python3", "manage.py", "runserver", "0:8000" ]

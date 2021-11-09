FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /django

RUN apk --update add
RUN apk add gcc libc-dev libffi-dev jpeg-dev zlib-dev libjpeg postgresql-dev python3-dev musl-dev --no-cache bash

COPY requirements.txt .
COPY entrypoint.sh .
RUN pip3 install -r requirements.txt
RUN chmod +x entrypoint.sh
COPY . .

ENTRYPOINT ["/django/entrypoint.sh"]


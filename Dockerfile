# syntax=docker/dockerfile:1
FROM python:3.8-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install dependencies
RUN pip install --upgrade pip
RUN apt-get update
RUN pip install psycopg2-binary


WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

COPY entrypoint.sh /code/
RUN chmod +x  /code/entrypoint.sh

ENTRYPOINT ["sh", "/code/entrypoint.sh"]
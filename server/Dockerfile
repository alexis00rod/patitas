FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=tpfinalBackend

EXPOSE 3306

COPY ./database.sql /docker-entrypoint-initdb.d/database.sql
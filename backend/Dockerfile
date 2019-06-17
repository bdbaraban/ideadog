FROM ubuntu:bionic

RUN apt-get update && \
    apt install -y sudo, gdebi
RUN apt-get install -y postgresql postgresql-contrib
#RUN apt-get install -y gdebi
RUN groupadd --gid 1337 workers
RUN useradd goliath --gid 1337 --uid 1337 -m -p docker
#RUN usermod -aG sudo goliath
RUN adduser goliath sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER goliath
WORKDIR /home/goliath/
ADD customerservice_server_0.1.0_amd64.deb /home/goliath/
ADD .env /home/goliath/
RUN gdebi customerservice_server_0.1.0_amd64.deb
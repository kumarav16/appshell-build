FROM jpetazzo/dind:latest

## Intermideate Container

RUN apt-get update && apt-get -y install systemd && \ 
	wget -qO- https://deb.nodesource.com/setup_8.x | bash - && apt-get -y install nodejs && \
	wget http://stedolan.github.io/jq/download/linux64/jq && \
	chmod +x ./jq && \
	yes | cp jq /usr/bin && \
	HELM_URL=https://storage.googleapis.com/kubernetes-helm && \
	HELM_TARBALL=helm-v2.11.0-linux-amd64.tar.gz && \
	curl -O $HELM_URL/$HELM_TARBALL && \
	tar xzfv $HELM_TARBALL && rm $HELM_TARBALL && \
	mv linux-amd64/helm /usr/local/bin/helm && \
	curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && \
	chmod +x ./kubectl && \
	mv ./kubectl /usr/local/bin

RUN useradd jenkins --shell /bin/bash --create-home

USER jenkins

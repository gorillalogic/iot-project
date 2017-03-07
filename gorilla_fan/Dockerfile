FROM golang:1.8
ADD . /go/src/gorilla_fan
RUN go get -u github.com/goadesign/goa/...
RUN go install gorilla_fan
ENTRYPOINT /go/bin/gorilla_fan
EXPOSE 9090

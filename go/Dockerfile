FROM golang:1.8
ADD . /go/src/gorilla_fan
RUN go get github.com/gin-gonic/gin && go get -u github.com/aws/aws-sdk-go/aws/... && go get gopkg.in/gin-contrib/cors.v1
RUN go install gorilla_fan
ENTRYPOINT /go/bin/gorilla_fan
EXPOSE 9090

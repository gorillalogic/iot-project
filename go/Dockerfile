FROM golang:1.8
ADD . /go/src/gorilla_fan
RUN go get gopkg.in/gin-gonic/gin.v1 && go get github.com/aws/aws-sdk-go/aws
RUN go install gorilla_fan
ENTRYPOINT /go/bin/gorilla_fan
EXPOSE 9090

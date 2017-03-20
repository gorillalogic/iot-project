package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iotdataplane"
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

func getThingShadow(thingName string) []byte {

	//TODO: make iodataplane only 1 function
	svc := iotdataplane.New(session.New(), &aws.Config{Region: aws.String("<region>"), Endpoint: aws.String("https://<endpoint")})

	params := &iotdataplane.GetThingShadowInput{
		ThingName: aws.String(thingName), // Required
	}
	resp, err := svc.GetThingShadow(params)
	check(err)

	return resp.Payload

}

func updateThingShadow(thingName string, payload []byte) []byte {

	svc := iotdataplane.New(session.New(), &aws.Config{Region: aws.String("<region>"), Endpoint: aws.String("https://<endpoint>")})
	params := &iotdataplane.UpdateThingShadowInput{
		Payload:   payload,               // Required
		ThingName: aws.String(thingName), // Required
	}
	resp, err := svc.UpdateThingShadow(params)
	check(err)
	return resp.Payload

}

type Thing interface {
	status(context *gin.Context)
	publish(context *gin.Context)
}

type Fan struct {
	name string
}

type FanSetup struct {
	State int `json:"state" binding:required`
}

func (fan *Fan) publish(context *gin.Context) {
	var payload FanSetup

	if context.BindJSON(&payload) == nil {

		shadow := map[string]interface{}{
			"state": map[string]interface{}{
				"desired": map[string]int{
					"fan": payload.State,
				},
			},
		}
		s, _ := json.Marshal(shadow)
		updateThingShadow(fan.name, s)
		context.JSON(http.StatusOK, gin.H{
			"name":   fan.name,
			"status": payload.State,
		})

	} else {
		fmt.Println("error")
	}

}

func (fan *Fan) status(context *gin.Context) {

	payload := getThingShadow(fan.name)
	var f interface{}

	err := json.Unmarshal(payload, &f)
	check(err)
	json_map := f.(map[string]interface{})
	state := json_map["state"]
	desired := state.(map[string]interface{})["desired"]
	onoff := desired.(map[string]interface{})["fan"]
	fmt.Println(onoff)

	context.JSON(http.StatusOK, gin.H{
		"name":   fan.name,
		"status": onoff,
	})

}

func check(err error) {
	if err != nil {
		panic(err)
	}
}

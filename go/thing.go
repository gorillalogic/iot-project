package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/iotdataplane"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getThingShadow(thingName string) ([]byte, error) {
	//TODO: make iodataplane a singleton
	svc := iotdataplane.New(session.New(), &aws.Config{Region: aws.String("us-west-2"), Endpoint: aws.String("https://a276znh1wuhoiz.iot.us-west-2.amazonaws.com")})

	params := &iotdataplane.GetThingShadowInput{
		ThingName: aws.String(thingName), // Required
	}
	resp, err := svc.GetThingShadow(params)
	if err != nil {
		return nil, err
	}

	return resp.Payload, nil

}

func updateThingShadow(thingName string, payload []byte) ([]byte, error) {

	//TODO: make iodataplane a singleton
	svc := iotdataplane.New(session.New(), &aws.Config{Region: aws.String("us-west-2"), Endpoint: aws.String("https://a276znh1wuhoiz.iot.us-west-2.amazonaws.com")})
	params := &iotdataplane.UpdateThingShadowInput{
		Payload:   payload,               // Required
		ThingName: aws.String(thingName), // Required
	}
	resp, err := svc.UpdateThingShadow(params)

	if err != nil {
		return nil, err
	}
	return resp.Payload, nil

}

type Thing interface {
	status(context *gin.Context)
	publish(context *gin.Context)
}

type Fan struct {
	name string
}

type FanSetup struct {
	State bool `json:"state" binding:required`
}

func (fan *Fan) publish(context *gin.Context) {
	var payload FanSetup
	var state int
	var r_state bool

	if context.BindJSON(&payload) == nil {

		if payload.State {
			state = 1
			r_state = true
		} else {
			state = 0
			r_state = false
		}

		shadow := map[string]interface{}{
			"state": map[string]interface{}{
				"desired": map[string]int{
					"fan": state,
				},
			},
		}
		s, _ := json.Marshal(shadow)
		updateThingShadow(fan.name, s)
		context.JSON(http.StatusOK, gin.H{
			"name":   fan.name,
			"status": r_state,
		})

	} else {
		fmt.Println("error")
	}

}

func (fan *Fan) status(context *gin.Context) {

	var f interface{}
	var r_state bool
	fan.name = context.Param("name")
	if fan.name == "" {
		context.JSON(422, gin.H{
			"status": "No Thing Name on parameter",
		})
	} else {
		payload, err := getThingShadow(fan.name)

		if err != nil {
			context.JSON(http.StatusOK, gin.H{
				"status": "No thing with that name",
			})

		} else {
			err := json.Unmarshal(payload, &f)
			check(err)
			json_map := f.(map[string]interface{})
			state := json_map["state"]
			desired := state.(map[string]interface{})["desired"]
			onoff := desired.(map[string]interface{})["fan"]

			if onoff == 1 {
				r_state = true

			} else {
				r_state = false

			}

			fmt.Println(onoff)
			if onoff == 1 {
				r_state = true
			} else {
				r_state = false

			}

			context.JSON(http.StatusOK, gin.H{
				"name":   fan.name,
				"status": r_state,
			})

		}

	}

}

type Thermo struct {
	name string
}

type ThermoSetup struct {
	Min float64 `json:"min_temp"`
	Max float64 `json:"max_temp"`
}

func (t *Thermo) status(context *gin.Context) {
	var f interface{}
	t.name = context.Param("name")

	if t.name == "" {
		context.JSON(422, gin.H{
			"status": "No Thing Name on parameter",
		})
	} else {

		payload, err := getThingShadow(t.name)
		if err != nil {
			context.JSON(http.StatusOK, gin.H{
				"status": "No thing with that name",
			})

		} else {
			err := json.Unmarshal(payload, &f)
			check(err)
			json_map := f.(map[string]interface{})
			state := json_map["state"]
			reported := state.(map[string]interface{})["reported"]
			current_temp := reported.(map[string]interface{})["temperature"]
			delta := state.(map[string]interface{})["delta"]
			min_temp := delta.(map[string]interface{})["min_temp"]
			max_temp := delta.(map[string]interface{})["max_temp"]

			context.JSON(http.StatusOK, gin.H{
				"name":        t.name,
				"temperature": current_temp,
				"min_temp":    min_temp,
				"max_temp":    max_temp,
			})

		}

	}

}

func (t *Thermo) publish(context *gin.Context) {

	var payload ThermoSetup
	var shadow interface{}
	t.name = context.Param("name")

	if t.name == "" {
		context.JSON(422, gin.H{
			"status": "No Thing Name on parameter",
		})

	} else {

		if context.BindJSON(&payload) == nil {

			switch {
			case payload.Min != 0 && payload.Max != 0:
				shadow = map[string]interface{}{
					"state": map[string]interface{}{
						"desired": map[string]float64{
							"min_temp": payload.Min,
							"max_temp": payload.Max,
						},
					},
				}
			case payload.Min == 0 && payload.Max != 0:
				shadow = map[string]interface{}{
					"state": map[string]interface{}{
						"desired": map[string]float64{
							"min_temp": payload.Min,
						},
					},
				}
			case payload.Min != 0 && payload.Max == 0:
				shadow = map[string]interface{}{
					"state": map[string]interface{}{
						"desired": map[string]float64{
							"min_temp": payload.Min,
						},
					},
				}
			default:
				fmt.Println("something weird happened")

			}

			s, _ := json.Marshal(shadow)
			_, err := updateThingShadow(t.name, s)
			if err != nil {

				check(err)

			} else {
				context.JSON(http.StatusOK, gin.H{
					"name":     t.name,
					"min_temp": payload.Min,
					"max_temp": payload.Max,
				})

			}

		} else {
			fmt.Println("error")
		}

	}

}

func check(err error) {
	if err != nil {
		panic(err)
	}
}

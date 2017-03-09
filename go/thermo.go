package main

import (
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

type ThermoThreshold struct {
	Min string `json:"min_temp" binding:required`
	Max string `json:"max_temp" binding:required`
}

func setThreshold(context *gin.Context) {

	var payload ThermoThreshold

	if context.BindJSON(&payload) == nil {

		context.JSON(http.StatusOK, gin.H{

			"min": payload.Min,
			"max": payload.Max,
		})
	} else {

		context.JSON(500, gin.H{

			"status": "error",
		})

	}

}

func getThemp(context *gin.Context) {

	context.JSON(http.StatusOK, gin.H{
		"id":          1,
		"temperature": "35",
		"metric":      "celcius",
		"timestamp":   20170101,
	})

}

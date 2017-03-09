package main

import (
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
)

type FanSetup struct {
	State string `json:"state" binding:required`
}

func turnFan(context *gin.Context) {

	var payload FanSetup

	if context.BindJSON(&payload) == nil {

		context.JSON(http.StatusOK, gin.H{
			"status": payload.State,
		})
	} else {

		context.JSON(500, gin.H{
			"status": "error",
		})

	}
}

func showFanStatus(context *gin.Context) {

	context.JSON(http.StatusOK, gin.H{
		"id":     1,
		"status": "off",
	})

}

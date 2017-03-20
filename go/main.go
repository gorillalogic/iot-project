package main

import (
	"gopkg.in/gin-gonic/gin.v1"
)

func main() {

	router := gin.Default()
	fan := Fan{
		name: "Fan1",
	}

	router.GET("/fan", fan.status)
	//TODO: Fix thermo data structure
	router.GET("/thermo", getThemp)
	router.PUT("/fan", fan.publish)
	router.PUT("/thermo", setThreshold)
	router.Run(":9090")

}

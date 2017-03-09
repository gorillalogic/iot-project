package main

import (
	"gopkg.in/gin-gonic/gin.v1"
)

func main() {

	router := gin.Default()

	router.GET("/fan", showFanStatus)
	router.GET("/thermo", getThemp)
	router.PUT("/fan", turnFan)
	router.PUT("/thermo", setThreshold)

	router.Run(":9090")

}

package main

import (
	"github.com/gin-gonic/gin"
	"gopkg.in/gin-contrib/cors.v1"
)

func main() {

	router := gin.Default()
	router.Use(cors.Default())
	fan := new(Fan)

	thermo := new(Thermo)

	// FAN API
	router.GET("/fan/", fan.status)
	router.GET("/fan/:name", fan.status)
	router.PUT("/fan", fan.publish)
	router.PUT("/fan/:name", fan.publish)

	// THERMOSTAT API
	router.GET("/thermo/", thermo.status)
	router.GET("/thermo/:name", thermo.status)
	router.PUT("/thermo/", thermo.publish)
	router.PUT("/thermo/:name", thermo.publish)
	router.Run(":9090")

}

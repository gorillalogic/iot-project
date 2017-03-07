//go:generate goagen bootstrap -d gorilla_fan/design

package main

import (
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
	"gorilla_fan/app"
)

func main() {
	// Create service
	service := goa.New("gorilla_fan")

	// Mount middleware
	service.Use(middleware.RequestID())
	service.Use(middleware.LogRequest(true))
	service.Use(middleware.ErrorHandler(service, true))
	service.Use(middleware.Recover())

	// Mount "fan" controller
	c := NewFanController(service)
	app.MountFanController(service, c)
	// Mount "thermo" controller
	c2 := NewThermoController(service)
	app.MountThermoController(service, c2)

	// Start service
	if err := service.ListenAndServe(":9090"); err != nil {
		service.LogError("startup", "err", err)
	}
}

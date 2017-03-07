package main

import (
	"github.com/goadesign/goa"
	"gorilla_fan/app"
)

// ThermoController implements the thermo resource.
type ThermoController struct {
	*goa.Controller
}

// NewThermoController creates a thermo controller.
func NewThermoController(service *goa.Service) *ThermoController {
	return &ThermoController{Controller: service.NewController("ThermoController")}
}

// List runs the list action.
func (c *ThermoController) List(ctx *app.ListThermoContext) error {
	// ThermoController_List: start_implement

	// Put your logic here

	// ThermoController_List: end_implement
	res := app.GorillaThermoCollection{}
	return ctx.OK(res)
}

// Setlimits runs the setlimits action.
func (c *ThermoController) Setlimits(ctx *app.SetlimitsThermoContext) error {
	// ThermoController_Setlimits: start_implement

	// Put your logic here

	// ThermoController_Setlimits: end_implement
	res := &app.GorillaThermo{}
	return ctx.OK(res)
}

// Show runs the show action.
func (c *ThermoController) Show(ctx *app.ShowThermoContext) error {
	// ThermoController_Show: start_implement

	// Put your logic here

	// ThermoController_Show: end_implement
	res := &app.GorillaThermo{}
	return ctx.OK(res)
}

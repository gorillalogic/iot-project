package main

import (
	"github.com/goadesign/goa"
	"gorilla_fan/app"
)

// FanController implements the fan resource.
type FanController struct {
	*goa.Controller
}

// NewFanController creates a fan controller.
func NewFanController(service *goa.Service) *FanController {
	return &FanController{Controller: service.NewController("FanController")}
}

// List runs the list action.
func (c *FanController) List(ctx *app.ListFanContext) error {
	// FanController_List: start_implement

	// Put your logic here

	// FanController_List: end_implement
	res := app.GorillaFanCollection{}
	return ctx.OK(res)
}

// Show runs the show action.
func (c *FanController) Show(ctx *app.ShowFanContext) error {
	// FanController_Show: start_implement

	// Put your logic here

	// FanController_Show: end_implement
	res := &app.GorillaFan{}
	return ctx.OK(res)
}

// Turn runs the turn action.
func (c *FanController) Turn(ctx *app.TurnFanContext) error {
	// FanController_Turn: start_implement

	// Put your logic here

	// FanController_Turn: end_implement
	res := &app.GorillaFan{}
	return ctx.OK(res)
}

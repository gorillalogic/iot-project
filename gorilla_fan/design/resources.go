package design

import (
	. "github.com/goadesign/goa/design" // Use . imports to enable the DSL
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("thermo", func() {
	BasePath("/thermo")
	DefaultMedia(ThermoMedia)
	Action("list", func() {
		Routing(GET(""))
		Description("Get a list of thermos")
		Response(OK, CollectionOf(ThermoMedia))
		Response(NotFound)
	})

	Action("show", func() {
		Routing(GET("/:thermoID"))
		Description("Get thermo by id")
		Response(OK)
		Response(NotFound)
	})
	Action("setlimits", func() {
		Routing(PUT("/:thermoID"))
		Description("Set Minimal threshold")
		Payload(ThermoPayload)

		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

})

var _ = Resource("fan", func() {
	BasePath("/fans")
	DefaultMedia(FanMedia)

	Action("list", func() {
		Routing(GET(""))
		Description("Get a list of Fans")
		Response(OK, CollectionOf(FanMedia))
		Response(NotFound)
	})

	Action("show", func() {
		Routing(GET("/:fanID"))
		Description("Get fan by id")
		Params(func() {
			Param("fanID", Integer, "FanID")
		})
		Response(OK)
		Response(NotFound)
	})

	Action("turn", func() {
		Routing(PUT("/:fanID"))
		Description("Turn off or on")
		Payload(FanPayload)
		Response(OK)
		Response(BadRequest, ErrorMedia)
	})

})

package design

import (
	. "github.com/goadesign/goa/design" // Use . imports to enable the DSL
	. "github.com/goadesign/goa/design/apidsl"
)

var FanMedia = MediaType("application/vnd.gorilla.fan+json", func() {
	Description("A Fan")
	Attributes(func() { // Attributes define the media type shape.
		Attribute("id", Integer, "Unique Fan ID")
		Attribute("href", String, "API href for making requests on the fan")
		Attribute("status", Boolean, "Current Status of Fan")
		Required("id", "href", "status")
	})
	View("default", func() { // View defines a rendering of the media type.
		Attribute("id")   // Media types may have multiple views and must
		Attribute("href") // have a "default" view.
		Attribute("status")
	})

})

var ThermoMedia = MediaType("application/vnd.gorilla.thermo+json", func() {
	Description("A Fan")
	Attributes(func() { // Attributes define the media type shape.
		Attribute("id", Integer, "Unique Thermometer ID")
		Attribute("href", String, "API href for making requests on the Thermo")
		Attribute("temperature", Number, "Current Temperature of Thermo")
		Attribute("mintemp", Number, "Minimum Temperature")
		Attribute("maxtemp", Number, "Maximum Temperature")
		Required("id", "href", "temperature")
	})
	View("default", func() { // View defines a rendering of the media type.
		Attribute("id")   // Media types may have multiple views and must
		Attribute("href") // have a "default" view.
		Attribute("temperature")
	})

})

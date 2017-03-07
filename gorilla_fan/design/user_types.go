package design

import (
	. "github.com/goadesign/goa/design" // Use . imports to enable the DSL
	. "github.com/goadesign/goa/design/apidsl"
)

var FanPayload = Type("FanPayload", func() {

	Attribute("status", Boolean, "Status of the Fan")

})

var ThermoPayload = Type("ThermoPayload", func() {

	Attribute("mintemp", Number, "Minimum Temperature")
	Attribute("maxtemp", Number, "Maximum Temperature")

})

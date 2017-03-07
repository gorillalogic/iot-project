package design

import (
	. "github.com/goadesign/goa/design" // Use . imports to enable the DSL
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = API("gorilla_fan", func() {
	Title("Gorilla IoT Fan")
	Description("API to manage IoT Fan prototypw")
	Scheme("http")
	Host("localhost:9090")
})

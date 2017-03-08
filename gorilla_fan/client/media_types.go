// Code generated by goagen v1.1.0-dirty, command line:
// $ goagen
// --design=gorilla_fan/design
// --out=$(GOPATH)/src/gorilla_fan
// --version=v1.0.0
//
// API "gorilla_fan": Application Media Types
//
// The content of this file is auto-generated, DO NOT MODIFY

package client

import (
	"github.com/goadesign/goa"
	"net/http"
)

// DecodeErrorResponse decodes the ErrorResponse instance encoded in resp body.
func (c *Client) DecodeErrorResponse(resp *http.Response) (*goa.ErrorResponse, error) {
	var decoded goa.ErrorResponse
	err := c.Decoder.Decode(&decoded, resp.Body, resp.Header.Get("Content-Type"))
	return &decoded, err
}

// A Fan (default view)
//
// Identifier: application/vnd.gorilla.fan+json; view=default
type GorillaFan struct {
	// API href for making requests on the fan
	Href string `form:"href" json:"href" xml:"href"`
	// Unique Fan ID
	ID int `form:"id" json:"id" xml:"id"`
	// Current Status of Fan
	Status bool `form:"status" json:"status" xml:"status"`
}

// Validate validates the GorillaFan media type instance.
func (mt *GorillaFan) Validate() (err error) {

	if mt.Href == "" {
		err = goa.MergeErrors(err, goa.MissingAttributeError(`response`, "href"))
	}

	return
}

// DecodeGorillaFan decodes the GorillaFan instance encoded in resp body.
func (c *Client) DecodeGorillaFan(resp *http.Response) (*GorillaFan, error) {
	var decoded GorillaFan
	err := c.Decoder.Decode(&decoded, resp.Body, resp.Header.Get("Content-Type"))
	return &decoded, err
}

// GorillaFanCollection is the media type for an array of GorillaFan (default view)
//
// Identifier: application/vnd.gorilla.fan+json; type=collection; view=default
type GorillaFanCollection []*GorillaFan

// Validate validates the GorillaFanCollection media type instance.
func (mt GorillaFanCollection) Validate() (err error) {
	for _, e := range mt {
		if e != nil {
			if err2 := e.Validate(); err2 != nil {
				err = goa.MergeErrors(err, err2)
			}
		}
	}
	return
}

// DecodeGorillaFanCollection decodes the GorillaFanCollection instance encoded in resp body.
func (c *Client) DecodeGorillaFanCollection(resp *http.Response) (GorillaFanCollection, error) {
	var decoded GorillaFanCollection
	err := c.Decoder.Decode(&decoded, resp.Body, resp.Header.Get("Content-Type"))
	return decoded, err
}

// A Fan (default view)
//
// Identifier: application/vnd.gorilla.thermo+json; view=default
type GorillaThermo struct {
	// API href for making requests on the Thermo
	Href string `form:"href" json:"href" xml:"href"`
	// Unique Thermometer ID
	ID int `form:"id" json:"id" xml:"id"`
	// Current Temperature of Thermo
	Temperature float64 `form:"temperature" json:"temperature" xml:"temperature"`
}

// Validate validates the GorillaThermo media type instance.
func (mt *GorillaThermo) Validate() (err error) {

	if mt.Href == "" {
		err = goa.MergeErrors(err, goa.MissingAttributeError(`response`, "href"))
	}

	return
}

// DecodeGorillaThermo decodes the GorillaThermo instance encoded in resp body.
func (c *Client) DecodeGorillaThermo(resp *http.Response) (*GorillaThermo, error) {
	var decoded GorillaThermo
	err := c.Decoder.Decode(&decoded, resp.Body, resp.Header.Get("Content-Type"))
	return &decoded, err
}

// GorillaThermoCollection is the media type for an array of GorillaThermo (default view)
//
// Identifier: application/vnd.gorilla.thermo+json; type=collection; view=default
type GorillaThermoCollection []*GorillaThermo

// Validate validates the GorillaThermoCollection media type instance.
func (mt GorillaThermoCollection) Validate() (err error) {
	for _, e := range mt {
		if e != nil {
			if err2 := e.Validate(); err2 != nil {
				err = goa.MergeErrors(err, err2)
			}
		}
	}
	return
}

// DecodeGorillaThermoCollection decodes the GorillaThermoCollection instance encoded in resp body.
func (c *Client) DecodeGorillaThermoCollection(resp *http.Response) (GorillaThermoCollection, error) {
	var decoded GorillaThermoCollection
	err := c.Decoder.Decode(&decoded, resp.Body, resp.Header.Get("Content-Type"))
	return decoded, err
}

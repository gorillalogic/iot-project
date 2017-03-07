// Code generated by goagen v1.1.0-dirty, command line:
// $ goagen
// --design=gorilla_fan/design
// --out=$(GOPATH)/src/gorilla_fan
// --version=v1.1.0-dirty
//
// API "gorilla_fan": thermo Resource Client
//
// The content of this file is auto-generated, DO NOT MODIFY

package client

import (
	"bytes"
	"fmt"
	"golang.org/x/net/context"
	"net/http"
	"net/url"
)

// ListThermoPath computes a request path to the list action of thermo.
func ListThermoPath() string {

	return fmt.Sprintf("/thermo")
}

// Get a list of thermos
func (c *Client) ListThermo(ctx context.Context, path string) (*http.Response, error) {
	req, err := c.NewListThermoRequest(ctx, path)
	if err != nil {
		return nil, err
	}
	return c.Client.Do(ctx, req)
}

// NewListThermoRequest create the request corresponding to the list action endpoint of the thermo resource.
func (c *Client) NewListThermoRequest(ctx context.Context, path string) (*http.Request, error) {
	scheme := c.Scheme
	if scheme == "" {
		scheme = "http"
	}
	u := url.URL{Host: c.Host, Scheme: scheme, Path: path}
	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return nil, err
	}
	return req, nil
}

// SetlimitsThermoPath computes a request path to the setlimits action of thermo.
func SetlimitsThermoPath(thermoID string) string {
	param0 := thermoID

	return fmt.Sprintf("/thermo/%s", param0)
}

// Set Minimal threshold
func (c *Client) SetlimitsThermo(ctx context.Context, path string, payload *ThermoPayload, contentType string) (*http.Response, error) {
	req, err := c.NewSetlimitsThermoRequest(ctx, path, payload, contentType)
	if err != nil {
		return nil, err
	}
	return c.Client.Do(ctx, req)
}

// NewSetlimitsThermoRequest create the request corresponding to the setlimits action endpoint of the thermo resource.
func (c *Client) NewSetlimitsThermoRequest(ctx context.Context, path string, payload *ThermoPayload, contentType string) (*http.Request, error) {
	var body bytes.Buffer
	if contentType == "" {
		contentType = "*/*" // Use default encoder
	}
	err := c.Encoder.Encode(payload, &body, contentType)
	if err != nil {
		return nil, fmt.Errorf("failed to encode body: %s", err)
	}
	scheme := c.Scheme
	if scheme == "" {
		scheme = "http"
	}
	u := url.URL{Host: c.Host, Scheme: scheme, Path: path}
	req, err := http.NewRequest("PUT", u.String(), &body)
	if err != nil {
		return nil, err
	}
	header := req.Header
	if contentType != "*/*" {
		header.Set("Content-Type", contentType)
	}
	return req, nil
}

// ShowThermoPath computes a request path to the show action of thermo.
func ShowThermoPath(thermoID string) string {
	param0 := thermoID

	return fmt.Sprintf("/thermo/%s", param0)
}

// Get thermo by id
func (c *Client) ShowThermo(ctx context.Context, path string) (*http.Response, error) {
	req, err := c.NewShowThermoRequest(ctx, path)
	if err != nil {
		return nil, err
	}
	return c.Client.Do(ctx, req)
}

// NewShowThermoRequest create the request corresponding to the show action endpoint of the thermo resource.
func (c *Client) NewShowThermoRequest(ctx context.Context, path string) (*http.Request, error) {
	scheme := c.Scheme
	if scheme == "" {
		scheme = "http"
	}
	u := url.URL{Host: c.Host, Scheme: scheme, Path: path}
	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return nil, err
	}
	return req, nil
}

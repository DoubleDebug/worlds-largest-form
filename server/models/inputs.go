package models

type InputValue struct {
	ID           int     `json:"id"`
	Text_value   *string `json:"text_value"`
	Number_value *int    `json:"number_value"`
	Bool_value   *bool   `json:"bool_value"`
	Select_value *int    `json:"select_value"`
}

const (
	InputTypeText   = "text"
	InputTypeNumber = "number"
	InputTypeBool   = "bool"
	InputTypeSelect = "select"
)

package models

type SelectOption struct {
	ID           *int    `json:"id"`
	Input_id     *int    `json:"input_id"`
	Option_index *int    `json:"option_index"`
	Option_name  *string `json:"option_name"`
}

package utils

import (
	"errors"
	"math/rand"
	"wlf/models"
)

func GetRandomInputType() string {
	var randNum = getRandomNumber(100)
	if randNum > 0 && randNum <= 25 {
		return models.InputTypeText
	}
	if randNum > 25 && randNum <= 50 {
		return models.InputTypeNumber
	}
	if randNum > 50 && randNum <= 75 {
		return models.InputTypeBool
	}

	return models.InputTypeSelect

}

func GetRandomInputValue() (*models.InputValue, error) {
	var randId = getRandomNumber(10)
	var randInputType = GetRandomInputType()

	switch randInputType {
	case models.InputTypeText:
		{
			var randStr = getRandomString(10)
			return &models.InputValue{
				ID:           randId,
				Text_value:   &randStr,
				Number_value: nil,
				Bool_value:   nil,
				Select_value: nil,
			}, nil

		}

	case models.InputTypeNumber:
		{
			var randNum = getRandomNumber(100)
			return &models.InputValue{
				ID:           randId,
				Text_value:   nil,
				Number_value: &randNum,
				Bool_value:   nil,
				Select_value: nil,
			}, nil
		}

	case models.InputTypeBool:
		{
			var randNum = getRandomNumber(100)
			var randBool = randNum > 50
			return &models.InputValue{
				ID:           randId,
				Text_value:   nil,
				Number_value: nil,
				Bool_value:   &randBool,
				Select_value: nil,
			}, nil
		}

	case models.InputTypeSelect:
		{
			var randNum = getRandomNumber(3)
			return &models.InputValue{
				ID:           randId,
				Text_value:   nil,
				Number_value: nil,
				Bool_value:   nil,
				Select_value: &randNum,
			}, nil
		}

	default:
		return nil, errors.New("invalid input type")
	}

}

func getRandomNumber(n int) int {
	return rand.Intn(n)
}

func getRandomString(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

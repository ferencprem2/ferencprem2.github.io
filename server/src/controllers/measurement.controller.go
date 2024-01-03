package controllers

import (
	"log"
	"main/src/database"
	"main/src/models"

	"github.com/gofiber/fiber/v2"
)

func Controller_Measurement(ctx *fiber.Ctx) error {
	var measurement models.Measurement

	if err := ctx.BodyParser(&measurement); err != nil {
		return ctx.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	measurementId, err := database.AddMeasurement(measurement)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	log.Println("Added measurement with id:\t", measurementId)

	return ctx.SendString("Data added successfully")
}

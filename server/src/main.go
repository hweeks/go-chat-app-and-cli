package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/rooms", GetRooms)
	router.GET("/rooms/:id", GetRoomById)
	router.POST("/rooms/create", CreateRoom)

	router.Run("0.0.0.0:3005")
}

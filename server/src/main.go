package main

import (
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/api/rooms/list", GetRooms)
	router.GET("/api/rooms/:id", GetRoomById)
	router.POST("/api/rooms/create", CreateRoom)

	router.Run("0.0.0.0:3005")
}

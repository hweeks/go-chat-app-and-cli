package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type author struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type message struct {
	ID      string `json:"id"`
	Content string `json:"content"`
	Author  author `json:"author"`
}

type room struct {
	ID       string    `json:"id"`
	Online   float32   `json:"online"`
	Offline  float32   `json:"offline"`
	Messages []message `json:"messages"`
}

var authors = []author{
	{ID: "1", Name: "hamsolo"},
}

var messages = []message{
	{ID: "1", Content: "hello y'all!", Author: authors[0]},
}

var rooms = []room{
	{ID: "1", Online: 1, Offline: 0, Messages: messages},
}

func GetRooms(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, rooms)
}

func CreateRoom(c *gin.Context) {
	var new_room room
	if err := c.BindJSON(&new_room); err != nil {
		return
	}

	rooms = append(rooms, new_room)
	c.IndentedJSON(http.StatusCreated, rooms)
}

func GetRoomById(c *gin.Context) {
	id := c.Param("id")

	for _, r := range rooms {
		if r.ID == id {
			c.IndentedJSON(http.StatusOK, r)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "room not found"})
}

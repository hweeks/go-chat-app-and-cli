package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type author struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Online bool   `json:"online"`
}

type message struct {
	ID      string    `json:"id"`
	Content string    `json:"content"`
	Author  author    `json:"author"`
	SentAt  time.Time `json:"posted"`
}

type room struct {
	ID       string    `json:"id"`
	Users    []author  `json:"users"`
	Title    string    `json:"title"`
	Messages []message `json:"messages"`
}

var authors = []author{
	{ID: uuid.NewString(), Name: "hamsolo"},
}

var messages = []message{
	{ID: uuid.NewString(), Content: "hello y'all!", Author: authors[0]},
}

var rooms = []room{
	{ID: uuid.NewString(), Title: "the one place we can cry", Users: authors, Messages: messages},
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

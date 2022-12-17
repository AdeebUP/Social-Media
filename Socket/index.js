const { Socket } = require('socket.io')

const io = require('socket.io')(8800, {
    cors : {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {
    // add new User
    socket.on('new-user-add', (newUserId) => {
        // if user is not added previously
        if(!activeUsers.some((user) => user.userId === newUserId))
        {
            activeUsers.push({
                userId: newUserId,
                socketId: sockey.id
            })
        }
    })
})
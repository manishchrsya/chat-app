const { Server } = require("socket.io");

const io = new Server({ cors: { "origin": "http://localhost:5173" } });

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("socket new connection", socket.id);
    // listen to a connection
    // when ever a connection comes online this method will tell the frontend that connection is online
    socket.on("addNewUser", (userId) => {
        const isNotAnOnlineUser = !onlineUsers.some((user) => user.userId === userId);
        console.log("userid", userId, isNotAnOnlineUser);
        if (isNotAnOnlineUser) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            });

        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const recipient = onlineUsers.find((user) => user.userId === message.recipientId);

        if (recipient) {
            io.to(recipient.socketId).emit("getMessage", message);
        }
    });

    // user is typing

    socket.on("setTypingStatus", (meta) => {
        console.log("meta", meta);
        const recipient = onlineUsers.find((user) => user.userId === meta.recipientId);
        if (recipient) {
            io.to(recipient.socketId).emit("getTypingStatus", meta);
        }
    });

    // when ever the connection logouts or leaves the website this will tell the frontend that connection is not online
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });

});

io.listen(3001);
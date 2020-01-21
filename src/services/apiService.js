export function apiService() {

    const chatEndPoint = 'http://localhost:8080/api/rooms';

    function getRooms() {

        return fetch(chatEndPoint, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                if(!data) {
                    throw new Error('Rooms API not responding, Please try again later!!');
                }
                return data;
            });
    }


    function getRoomDetails(roomId) {

        var endPoint = chatEndPoint + "/" + roomId;

        return fetch(endPoint, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                if(!data ) {
                    throw new Error('Can not get room details, Please try again later!!');
                }
                return data;
            });
    }

    function sendGroupMessage(userName, msg, roomId) {

        var endPoint = chatEndPoint + "/" + roomId + "/messages";

        console.log("userName :: ", userName, "msg :: " , msg, "roomId :: " , roomId);

        return fetch(endPoint, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomId: roomId,
                    name: userName,
                    message: msg
                }) // body data type must match "Content-Type" header
            })
            .then((res) => {

                return res.json()
            })
            .then((data) => {

                if(!data) {
                    throw new Error('Please try again later!!');
                }
                return data;
            });
    }


    function getGroupMessages(roomId) {

        var endPoint = chatEndPoint + "/" + roomId + "/messages";

        return fetch(endPoint, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {

                return res.json()
            })
            .then((data) => {

                if(!data) {
                    throw new Error('Please try again later!!');
                }
                return data;
            });
    }

    return {
        getRooms : getRooms,
        getRoomDetails : getRoomDetails,
        sendGroupMessage: sendGroupMessage,
        getGroupMessages: getGroupMessages
    };

};

export default apiService;

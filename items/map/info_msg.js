const galileoAPI = require('galileo-api');

function trackCommunication(radarId, data) {
    galileoAPI.sendData({
        radarId: radarId,
        timestamp: Date.now(),
        data: data
    }).then(response => {
        console.log('Data tracked successfully:', response);
    }).catch(error => {
        console.error('Error in communication tracking:', error);
    });
}

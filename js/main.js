var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/ckeeHmy48rw:APA91bFJZbHZQiYfUInnMQneVXfXZkKKp_TPkFPrpmHqdkrPsa50dnzXHtsROQvRdD3l0qPu-ukzuj8CqLgytc4_SKdPDr7dAICXYcacGHhQmbHbsOcSbJ0UvQWiczZBZbdyrNvZbKX8",
    "keys": {
        "p256dh": "BBTZ/krGBzoS7j/SJkmn6zI5Evyzxgv8x5mdalHAZI0Hohr/jX0s8SIDTHoFEKyg99CY5FwrDBbY58wmPK6yvgI=",
        "auth": "BEjQ7QO8tLxaEbJimNoH/Q=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAAs4Mb77E:APA91bG2LSpcpTMvqkusCrh-7bkqIO2KN3CPu99lEA-J_L8_JWCH0rXEJuRb3I6P7xCIKyqZX-L9UEZGH2ed__D1kurp0Z-oRl4GA07usMpCQhWzPS9yMNZHo8ThV5EVbcHO2AvIiwyR',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
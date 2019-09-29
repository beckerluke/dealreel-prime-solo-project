const getLocation = () => {

    // deferred Promise to get user coordinates and returns them in 
    // object when resolved
    return new Promise((resolve, reject) => {

    

        function onPositionReceived(position) {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            resolve({
                lng,
                lat
            })
        }
        

        function locationNotReceived(positionError) {
            console.log(positionError);
            
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onPositionReceived, locationNotReceived);

            let watch = navigator.geolocation.watchPosition(onPositionReceived, locationNotReceived);
            navigator.geolocation.clearWatch(watch);
        } 
    })
}

export default getLocation;
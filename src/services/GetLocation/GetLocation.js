const getLocation = () => {
    function onPositionReceived(position) {
        console.log(position.coords);
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(`longitude: ${lng} | latitude: ${lat}`);
        
    }

    function locationNotReceived(positionError) {
        console.log(positionError);
        
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionReceived, locationNotReceived);

        let watch = navigator.geolocation.watchPosition(onPositionReceived, locationNotReceived);
        navigator.geolocation.clearWatch(watch);
    }
}

export default getLocation;
fetch('https://supply.team22.sweispring21.tk/api/v1/supply/returnVehicle')
    .then((response) => {
        console.log(response);
        return response.json()
    })
        .then((responsedata) => {
                console.log(JSON.stringify(responsedata));
                console.log(typeof(responsedata))
                return responsedata
            })
        .catch(err => { throw err });
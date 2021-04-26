$(() => {
  let cloud = window.location.hostname.split('.')[0]
  let cloudURL = `https://${cloud}.team22.sweispring21.tk`

  //Get vehicles from database
  fetch( cloudURL + "/api/v1/supply/returnVehicles", {
      method: "GET"
  }).then((response) => {
      console.log(response);
      return response.json()
  }).then((mydata) => {
      console.log(typeof (mydata));
      console.log(mydata);
      
      //function to create header of table
      function addHeaders(table, keys) {
        table.tHead = document.createElement('thead');
        const tHeadTR = table.tHead.insertRow(-1);
        
        for (var i = 0; i < keys.length; i++) {
         
          const th = document.createElement('th');
          th.textContent = keys[i] 
          tHeadTR.appendChild(th);
        }
      }

      //iterate through array
      for (let i = 0; i < mydata.length; i++) {
        let section = mydata[i];
        
        let table = document.createElement('table');

      //create each row and header of table
        for (let m = 0; m < Object.keys(section).length; m++) {
          let obj = section[m];
        
          if (m === 0) {
            let h = document.createElement("HEADER");
            document.getElementById('tables').appendChild(h);
            let h2 = document.createElement("H2");
            let txt = document.createTextNode("Fleet " + i);
            h2.appendChild(txt);
            h.appendChild(h2);
            addHeaders(table, Object.keys(obj));
          }
          let row = table.insertRow();
          Object.keys(obj).forEach(function(k) {
          
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(obj[k]));
          })

          document.getElementById('tables').appendChild(table)
          document.getElementById('tables').appendChild(document.createElement("br"));

        }
      }
      
  $("table tr").click(function() {
    $(this).addClass('selected').siblings().removeClass('selected');
    let vType = $(this).find('td:last').html();
    let id = $(this).find('td:first').html();

    if (confirm("Are you sure you want to remove Vehicle: " +  id + "\nIts is of type: " + vType)) {
      console.log("delete vehicle");
      let data = {
        'cloud': cloud,
        '_id' : id,
        'vType' : vType
      };
        fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/supply/deleteVehicle`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        }).then(data => {
            console.log(data)
            location.reload();
        }).catch(error => {
            throw error
        })
    } 
    else {
      console.log("cancel");
    }
  });
  }).catch(err => {
      throw err
  });

});

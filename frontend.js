function trackFlight() {
    const flightNumber = document.getElementById("flightNumber").value;
    if (!flightNumber) {
      alert("Please enter a flight number.");
      return;
    }
  
    fetch(`/api/track-flight?flightNumber=${flightNumber}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const flight = data.flight;
          document.getElementById("flightDetails").innerHTML = `
            <h3>Flight Details:</h3>
            <p><strong>Airline:</strong> ${flight.airline.name}</p>
            <p><strong>Flight Number:</strong> ${flight.flight.iata}</p>
            <p><strong>Departure:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
            <p><strong>Arrival:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
            <p><strong>Status:</strong> ${flight.flight_status}</p>
          `;
  
          const map = L.map('map').setView([flight.geography.latitude, flight.geography.longitude], 6);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          }).addTo(map);
  
          L.marker([flight.geography.latitude, flight.geography.longitude])
            .addTo(map)
            .bindPopup(`<b>${flight.airline.name} ${flight.flight.iata}</b>`)
            .openPopup();
        } else {
          document.getElementById("flightDetails").innerHTML = "<p>No flight data found.</p>";
        }
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("flightDetails").innerHTML = "<p>Failed to fetch flight data. Please try again.</p>";
      });
  }
// Function to update UI with car details
function updateUI(carDetails) {
  if (carDetails && carDetails.image) {
    header.style.backgroundImage = `url(images/${carDetails.image}.jpg)`;
    model.innerHTML = carDetails.name;
    start.innerHTML = carDetails.start || "";
    speed.innerHTML = carDetails.topSpeed || "";
    engine.innerHTML = carDetails.engine || "";
  } else {
    // Handle the case where image information is missing or undefined
    console.error('Image information is missing or undefined in carDetails.');
  }
}


// Function to fetch car details from Express server
async function fetchCarDetails(carName) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/cars/${carName}`);
    const carDetails = await response.json();
    return carDetails;
  } catch (error) {
    console.error('Error fetching car details:', error);
    return null;
  }
}

// Event listeners for each car click
chiron.onclick = async function () {
  const carDetails = await fetchCarDetails('Chiron');
  updateUI(carDetails);
};

divo.onclick = async function () {
  const carDetails = await fetchCarDetails('Divo');
  updateUI(carDetails);
};

cent.onclick = async function () {
  const carDetails = await fetchCarDetails('Veyron');
  updateUI(carDetails);
};

la.onclick = async function () {
  const carDetails = await fetchCarDetails('Vision GT');
  updateUI(carDetails);
};




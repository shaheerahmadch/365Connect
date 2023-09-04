
document.getElementById("search").addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        // Do something better
        find(document.getElementById("search").value)
    }
});
// Replace with your API endpoint URL
var myHeaders1 = new Headers();
myHeaders1.append("type", "Past");

var requestOptions1 = {
method: 'GET',
headers: myHeaders1,
redirect: 'follow'
};
const apiUrl1 = "https://prod-40.southeastasia.logic.azure.com:443/workflows/133ffc3632e14b338c946ead39b702bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cAmOD1oq-z3We3B9lZe8LBvkPJSOgf9yYiKMC8r3Jfk";

var myHeaders = new Headers();
myHeaders.append("type", "UpComing");

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
const apiUrl = "https://prod-40.southeastasia.logic.azure.com:443/workflows/133ffc3632e14b338c946ead39b702bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cAmOD1oq-z3We3B9lZe8LBvkPJSOgf9yYiKMC8r3Jfk";

// Function to fetch event data from the API
async function fetchEventData() {
    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Function to create and display the event list
async function displayEventList() {
    document.getElementById("loading").style.display = "block";
    const eventList = document.getElementById("event-list");
    const events = await fetchEventData();

    events.forEach(event => {
        const listItem = document.createElement("li");
        listItem.className = "event-item";
        listItem.innerHTML = `<h1>${event.sa_name}</h1>
            <p> ${event.sa_description}</p><br>
            <p><strong>Start Date:</strong> ${event["sa_start@OData.Community.Display.V1.FormattedValue"]}</p>
            <p><strong>End Date:</strong> ${event["sa_end@OData.Community.Display.V1.FormattedValue"]}</p>
            <p><strong>Status:</strong> ${event["statuscode@OData.Community.Display.V1.FormattedValue"]}</p><br>
            <button class="view-details">View Details</button>
        `;

        if (event.statuscode === 126380003) {
            listItem.innerHTML += `<a href="${event.sa_registrationlink}" target="_blank"><button class="register-now">Register Now</button></a>`;
        }

        listItem.querySelector(".view-details").addEventListener("click", () => openPopup(event));
        eventList.appendChild(listItem);
    });
    document.getElementById("loading").style.display = "none";
};
////////////////////

////////////////////

// Function to open the popup with event details
function openPopup(event) {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const eventName = document.getElementById("event-name");
    const eventStart = document.getElementById("event-start");
    const eventEnd = document.getElementById("event-end");
    const eventDescription = document.getElementById("event-description");
    const eventStatus = document.getElementById("event-status");
    const registerNowLink = document.getElementById("register-now-link");
    const eventType = document.getElementById("event-type");

    eventName.textContent = event.sa_name;
    eventStart.textContent = event["sa_start@OData.Community.Display.V1.FormattedValue"];
    eventEnd.textContent = event["sa_end@OData.Community.Display.V1.FormattedValue"];
    eventDescription.textContent = event.sa_description;
    eventStatus.textContent = event["statuscode@OData.Community.Display.V1.FormattedValue"];
    eventType.textContent = event["sa_eventtype@OData.Community.Display.V1.FormattedValue"];

    if (event.statuscode === 126380003) {
        registerNowLink.href = event.sa_registrationlink;
        registerNowLink.style.display = "block";
    } else {
        registerNowLink.style.display = "none";
    }

    overlay.style.display = "block";
    popup.style.display = "block";
    // close popup
    document.getElementById("close-popup").addEventListener("click", () => {
        overlay.style.display = "none";
        popup.style.display = "none";
    });
};
// Initialize the page
document.getElementById("loading").style.display = "none";
displayEventList();

displayEventList1();

async function displayEventList1() {
    document.getElementById("loading").style.display = "block";
    const comp_eventList = document.getElementById("event-list1");
    const comp_events = await fetchEventData1();

    comp_events.forEach(comp_event => {
        const comp_listItem = document.createElement("li");
        comp_listItem.className = "event-item";
        comp_listItem.innerHTML = `<h1>${comp_event.sa_name}</h1>
            <p> ${comp_event.sa_description}</p><br>
            <p><strong>Start Date:</strong> ${comp_event["sa_start@OData.Community.Display.V1.FormattedValue"]}</p>
            <p><strong>End Date:</strong> ${comp_event["sa_end@OData.Community.Display.V1.FormattedValue"]}</p>
            <p><strong>Status:</strong> ${comp_event["statuscode@OData.Community.Display.V1.FormattedValue"]}</p><br>
            <button class="view-details">View Details</button>
        `;

        if (comp_event.statuscode === 126380003) {
            comp_listItem.innerHTML += `<a href="${comp_event.sa_registrationlink}" target="_blank"><button class="register-now">Register Now</button></a>`;
        }

        comp_listItem.querySelector(".view-details").addEventListener("click", () => openPopup(comp_event));
        comp_eventList.appendChild(comp_listItem);
        
    });
    document.getElementById("loading").style.display = "none";
};

async function fetchEventData1() {
    try {
        const response1 = await fetch(apiUrl1, requestOptions1);
        const data1 = await response1.json();
        return data1;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
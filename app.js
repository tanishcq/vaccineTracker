let baseURL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='
const date = document.getElementById('date');
const pin = document.getElementById('pincode');
const cost = document.getElementById('cost');
const locate = document.getElementById('search');
const out = document.getElementById('output-container');
const dataInput = document.querySelector('.data-input');
const footer = document.querySelector('footer')
const displayData = document.getElementById('output-container')
const reload = document.getElementById('reload-button')

// const axios = require('axios');

let arr; 

let costs, api = "";
date.addEventListener('change', () => {
  arr = date.value.split('-');
})

function extractData(inboundData){
  dataInput.innerHTML = "";
  for (data of inboundData){
    if(costs!='All')
      if(data.fee_type!=costs)
        continue;

    //Creating Data Blocks
    let slot = document.createElement('div');
    let name = document.createElement('h2');
    let address = document.createElement('h5');
    let vaccine = document.createElement('h2');
    let min_age = document.createElement('div');
    let max_age = document.createElement('div');
    let d1 = document.createElement('p');
    let d2 = document.createElement('p');
    let from = document.createElement('span');
    let to = document.createElement('span');
    let price = document.createElement('p');

    //Adding data
    name.innerText = data.name;
    address.innerText = data.address;
    vaccine.innerText = data.vaccine;
    if (data.max_age_limit == undefined) 
        max_age.innerHTML = `<b>Max Age:</b> ${data.min_age_limit} and Above`;
    else 
        max_age.innerHTML = `<b>Max Age:</b> ${data.max_age_limit}`
    min_age.innerHTML = `<b>Min Age:</b> ${data.min_age_limit}`;
    d1.innerHTML = `<b>Dose 1:</b> ${data.available_capacity_dose1}`;
    d2.innerHTML = `<b>Dose 2:</b> ${data.available_capacity_dose2}`;
    from.innerHTML = `<b>Timing:</b> ${data.from}` 
    to.innerHTML = ` <b>to</b> ${data.to}`
    if (parseInt(data.fee) == 0)
        price.innerHTML = "<b>Free</b>"
    else
        price.innerHTML = `<b>Fee:</b> ${data.fee}`;

    //Styles
    if (parseInt(data.available_capacity_dose1) > 0)
    d1.style.backgroundColor = "#00bb2f";
    else
    d1.style.backgroundColor = "#F55C47"

    if (parseInt(data.available_capacity_dose2) > 0)
    d2.style.backgroundColor = "#00bb2f";
    else
    d2.style.backgroundColor = "#F55C47" 

    vaccine.style.color = "#3C8DAD"
    price.style.backgroundColor = "#00e1ff"

    //Appending Datablocks to container
    slot.append(name);
    slot.append(address);
    slot.append(vaccine);
    slot.append(min_age);
    slot.append(max_age);
    slot.append(d1);
    slot.append(d2);
    slot.append(from);
    slot.append(to);
    slot.append(price);
    displayData.append(slot);
    slot.classList.add("slot", "col", "p-1");
    d1.classList.add('p1');
    d2.classList.add('p2');
  }
}

const fetchingData = async() =>{
  api = `${baseURL}${pin.value}&date=${arr[2]}-${arr[1]}-${arr[0]}`;
  costs = cost.value;
  try{
    const res = await fetch(api);
    const data = await res.json();
    footer.style.position = "static";
    dataInput.remove();
    console.log(data.sessions);
    extractData(data.sessions);
  }catch(e){
    console.log("Not Found");
    console.log(e);
  }
}

locate.addEventListener('click', () => {
  reload.classList.remove('reset-disabled');
  reload.classList.add('reset-enabled');
  fetchingData();
});

reload.addEventListener('click', ()=>{
  window.location.reload();
  console.log('reset');
})

// locate.addEventListener('click', () => {
//   api = `${baseURL}${pin.value}&date=${arr[2]}-${arr[1]}-${arr[0]}`;
//   fetch(api)
//   .then((data) => data.json())
//   .then((fetched) => {
//     console.log(fetched.sessions);
//     dataInput.remove();
//     fetchData(fetched.sessions);
//     footer.style.position = "static";
//   })
//   .catch(e => {
//     console.log("Not Found");
//     console.log(e);
//   })
// })

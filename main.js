const firebaseConfig = {
  apiKey: "AIzaSyAHYguXNxgoBQq0rdoFOj9MMppCU9kmE-Y",
  authDomain: "citycoin2025.firebaseapp.com",
  databaseURL: "https://citycoin2025-default-rtdb.firebaseio.com",
  projectId: "citycoin2025",
  storageBucket: "citycoin2025.firebasestorage.app",
  messagingSenderId: "1024446979523",
  appId: "1:1024446979523:web:f2b3b89e039c92aaef7176",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();


const secondaryAppConfig = {
	projectId: "<cars-digital-3c158>",
	appId: "<1:606775878283:web:07d3d79d7b186be576aa8e>",
	apiKey: "<AIzaSyDZOkXdDSaw1xwonO7L8GcdSfQUtbSMM4c>",
	databaseURL: "https://cars-digital-3c158-default-rtdb.firebaseio.com",
	storageBucket: "cars-digital-3c158.appspot.com",
};
const secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");

// FORMS
let current_form = document.getElementById("clientform");

// CURRENT TAB
let currentTab = {
	index: 0,
	drods: [],
	inputs: [],
	files: [],
};

// CURRENT INPUTS
let current_tab = document.createElement("section");
let current_input = document.createElement("input");
let current_drpdown = document.createElement("ul");

// RANDOM NUMBERS
function RandomNumber(min, max) {
	var minn = Math.ceil(min);
	var maxx = Math.floor(max);
	return Math.floor(Math.random() * (maxx - minn)) + minn;
}

var monthlist = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];


// Dates
function dateObjectsplit(date) {
	function dto(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	let dt = new Date();
	if (date) {
		dt = new Date(date);
	}
	let d = dto(dt.getDate());
	let m = dto(dt.getMonth() + 1);
	let y = dt.getFullYear();
	let split = y + "-" + m + "-" + d;
	return split;
}
// get difference days between two dates
function getdaysDiff(endDate) {
	let dt = new Date();
	let dt2 = new Date(endDate);
	let timediff = dt2 - dt;
	let days = Math.ceil(timediff / (1000 * 3600 * 24));
	return days;
}

// Numbers
function numbersOnly(evt) {
	var theEvent = evt || window.event;
	if (theEvent.type === "paste") {
		key = event.clipboardData.getData("text/plain");
	} else {
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /[0-9]|\./;
	if (!regex.test(key)) {
		theEvent.returnValue = false;
		if (theEvent.preventDefault) theEvent.preventDefault();
	}
}
function addDays(date, days) {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + days);
	return newDate;
}

function onecheckBox(cbox) {
	let id = cbox.id;
	let x = document.getElementsByName(cbox.name);
	let nput = document.getElementById(cbox.name);
	for (let i = 0; i < x.length; ++i) {
		if (x[i].id === id) {
			if (x[i].checked === true) {
				nput.value = x[i].value;
				nput.dispatchEvent(new Event("input"));
			} else {
				nput.value = "";
				nput.dispatchEvent(new Event("input"));
			}
		} else {
			x[i].checked = false;
		}
	}
	nput.dispatchEvent(new Event("change"));
}




let careerSectors = [
	"Advertising ",
	"Agribusiness",
	"Agriculture",
	"Aviation",
	"Banking",
	"Blockchain",
	"Construction",
	"Consulting",
	"Creative/Arts",
	"E-commerce",
	"Education",
	"Energy",
	"Engineering",
	"Environment",
	"Financial Services",
	"Food Services",
	"General",
	"Government",
	"Healthcare",
	"Hospitality",
	"Insurance",
	"Law / Legal",
	"Logistics",
	"Logistics",
	"Manufacturing",
	"Marine",
	"Marketing",
	"Media",
	"NGO",
	"Oil & Gas",
	"Pharmaceuticals",
	"Raffle",
	"Real Estate",
	"Religious",
	"Research",
	"Sales / Retail",
	"Science",
	"Security",
	"Social Associations",
	"Technology",
	"Telecommunication",
	"Tourism",
	"Travel and Tours",
	"Others",
];

// TAB NAVIGATOR
const next_Tab = (step) => {
	let index = currentTab.index;
	if (step < 0 && index == 0) {
		index = 0;
	} else if (step > 0 && index == 5) {
		index = 5;
		window.alert("you are on the final page");
	} else {
		index = index + step;
	}
	currentTab.index = index;
	let tabs = current_form.querySelectorAll(".inputs section");
	tabs.forEach((tab) => {
		tab.classList.remove("shown");
	});
	current_tab = tabs[index];
	current_tab.classList.add("shown");
	let previas = document.getElementById("btnprevious");
	let next = document.getElementById("btnsubmt");
	previas.classList.add("shown");
	next.innerText = "NEXT";

	if (index <= 0) {
		previas.classList.remove("shown");
	}
	if (index == 5) {
		next.innerText = "SUBMIT";
	}
	currentTab.inputs = current_tab.querySelectorAll(".nput");

	let files = [document.getElementById("userimage")];
	let imgs = current_tab.querySelectorAll(".img .nput");
	if (imgs.length > 0) {
		files = [...new Set([...files, ...imgs])];
	}
	currentTab.files = files;
};

const resizeImages = (nput) => {
	let dt = Number(new Date());
	let meid = document.getElementById("profileID").value;
	let name = "files/" + meid + "_" + dt + ".png";
	if (nput.id == "userimage") {
		name = "photos/" + meid + "_" + dt + ".png";
	}
	let xxx = nput.files[0];
	if (!xxx) return;
	let reader = new FileReader();
	reader.readAsDataURL(xxx);
	reader.name = xxx.name;
	reader.size = xxx.size;

	reader.onload = function (event) {
		let img = new Image();
		img.src = event.target.result;
		img.name = event.target.name;
		img.size = event.target.size;

		img.onload = function (el) {
			let x = document.createElement("canvas");
			let W = el.target.width;
			let H = el.target.height;
			if (H > W) {
				x.height = 500;
				x.width = Math.round((W * 500) / H);
			} else if (W > H) {
				x.width = 500;
				x.height = Math.round((H * 500) / W);
			} else {
				x.width = 500;
				x.height = 500;
			}
			let ctx = x.getContext("2d");
			ctx.drawImage(el.target, 0, 0, x.width, x.height);
			let srcEncoded = ctx.canvas.toDataURL("image/png", 1);
			nput.dataset.url = srcEncoded;
			uploadimage(nput, name, srcEncoded);
		};
	};
};

const uploadimage = (nput, name, srcEncoded) => {
	nput.nextElementSibling.src = nput.dataset.url;
	let uid = document.getElementById("userID").value;
	if (!uid) return;
	let ref = secondaryApp.storage().ref("/cityusersdb");
	ref
		.child(name)
		.putString(srcEncoded, "data_url")
		.then((snapshot) => snapshot.ref.getDownloadURL())
		.then((myurl) => {
			if (myurl !== "") {
				nput.dataset.url = myurl;
				nput.dispatchEvent(new Event("input"));
				nput.nextElementSibling.src = nput.dataset.url;
			}
		});
};

current_form.querySelectorAll(".nput[type='file']").forEach((nput) => {
	nput.onchange = function (e) {
		resizeImages(nput);
		nput.dispatchEvent(new Event("input"));
	};
});

function setnewPosition(par) {
	let inputs = current_form.querySelector(".inputs");
	let grndparent = current_input.closest(".lb");
	let H = inputs.offsetTop + inputs.clientHeight;
	//grandparent
	let H2 = grndparent.offsetTop + grndparent.clientHeight;
	//parent
	let parW = par;
	let ol = parW.offsetLeft;
	let ow = parW.clientWidth;

	current_drpdown.style.display = "grid";
	let H3 = H - (H2 + current_drpdown.offsetHeight) + 10;

	//current_drpdown.style.width = `${ol}px`;
	//current_drpdown.style.right = `${0}px`;

	current_drpdown.style.maxWidth = `${ow}px`;

	current_drpdown.style.left = `${ol}px`;
	current_drpdown.style.right = `auto`;
	if (current_input.name == "sectors") {
	}
	if (current_input.name == "tittles") {
		current_drpdown.style.left = `auto`;
		current_drpdown.style.right = `${0}px`;
		current_drpdown.style.width = `${150}px`;
	}

	if (current_input.className == "dt") {
		current_drpdown.style.left = `${ol - 20}px`;
		current_drpdown.style.right = `auto`;
		current_drpdown.style.maxWidth = `${120}px`;
	}

	if (H3 < 0) {
		current_drpdown.style.bottom = "50px";
		current_drpdown.style.top = `auto`;
	} else {
		current_drpdown.style.top = `50px`;
		current_drpdown.style.bottom = "auto";
	}
}

function loadDates() {
	let data = [];
	let dob = document.getElementById("dobirth");

	if (current_input.id == "DD") {
		let dt = new Date();
		if (dob.value) {
			dt = new Date(dob.value);
		}
		let year = dt.getFullYear();
		let month = dt.getMonth() + 1;
		let xdays = [];
		let d = new Date(year, month, 0).getDate();
		for (var i = 0; i < d; i++) {
			xdays.push(i + 1);
		}
		data = xdays;
	} else if (current_input.id == "MM") {
		data = monthlist;
	} else if (current_input.id == "YY") {
		let years = [];
		let yrsoffset = 55;
		let thisyear = new Date().getFullYear();
		for (var i = 0; i < yrsoffset; i++) {
			years.push(thisyear - 18 - i);
		}
		data = years;
	}
	let rf = document.createDocumentFragment();
	for (let i = 0; i < data.length; i++) {
		let li = document.createElement("li");
		li.dataset.data = JSON.stringify(data[i]);
		li.innerHTML = "<p>" + data[i] + "</p>";
		rf.appendChild(li);
	}
	let dropdwn = document.getElementById("dates");
	dropdwn.querySelector("ul").replaceChildren(rf);
}

const calculateAge = (borndate) => {
	let dt = new Date();
	if (borndate) {
		dt = new Date(borndate);
	}
	var monthdiff = Date.now() - dt.getTime();
	var newdt = new Date(monthdiff);
	var year = newdt.getUTCFullYear();
	var age = Math.abs(year - 1970);
	return age;
};

const getbirthdates = () => {
	let day = document.getElementById("DD");
	let month = document.getElementById("MM");
	let year = document.getElementById("YY");
	let age = document.getElementById("userAge");
	let dob = document.getElementById("dobirth");

	let dt = new Date();
	let d = dt.getDate() + 0;
	let m = dt.getMonth() + 1;
	let y = dt.getFullYear() + 0;

	if (day.value) {
		d = parseInt(day.value);
		day.classList.add("ok");
	}
	if (month.value) {
		m = monthlist.indexOf(month.value) + 1;
		month.classList.add("ok");
	}
	if (year.value) {
		y = parseInt(year.value);
		year.classList.add("ok");
	}
	let x = y + "-" + m + "-" + d;
	dt = new Date(x);
	dob.value = dateObjectsplit(dt);
	age.value = calculateAge(dt) + " years";

	if (dob.value) {
		let dt = new Date(dob.value);
		let d = dt.getDate();
		let m = dt.getMonth();
		let y = dt.getFullYear();
		day.value = d;
		month.value = monthlist[m];
		year.value = y;
	}
};

document.querySelectorAll("input.dt").forEach((nput) => {
	nput.addEventListener("click", (e) => {
		current_input = nput;
		current_drpdown = document.getElementById("dates");
		let disp = current_drpdown.style.display;
		if (disp !== "" && disp !== "none") {
			current_drpdown.style.display = "none";
		} else {
			current_drpdown.style.display = "grid";
			loadDates();
			setnewPosition(nput);
		}
	});
});

const setfullname = () => {
	let fname = document.getElementById("firstname");
	let sname = document.getElementById("secondname");
	let lname = document.getElementById("lastname");
	let fullname = document.getElementById("userfullname");
	let x;
	x = sname.value + " " + fname.value;
	if (lname.value !== "") {
		x = lname.value + " " + fname.value;
	}
	fullname.value = x.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
};

// EXIT ANY OPEN ON WINDOW CLICK
/*
window.addEventListener("mouseup", function (e) {
  dropdownrs.forEach((drodwn) => {
    if (e.target !== current_input) {
      drodwn.style.display = "none";
    }
  });
});
*/

function formater(nput) {
	if (nput.type == "file") {
		return;
	}
	if (nput.id == "contactList") return;
	let container = nput.closest(".lb");
	if (!container) {
		return;
	}
	if (nput.value == "") {
		container.classList.remove("valid");
		return nput;
	}
	container.classList.add("valid");
	let nputext = nput.value;
	if (nput.type == "tel") {
		let isValid = nput.checkValidity();
		if (isValid == false) {
			nput.className = "nput invalid";
			return nput;
		}
	}
	nput.value = nputext.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
	if (nput.type == "email") {
		let newemail = nputext.replace(/\s/g, "").toLowerCase();
		nput.value = newemail;
		let isEmail =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!nput.value.match(isEmail)) {
			//let email = document.getElementById("email");
			nput.className = "nput invalid";
			container.classList.remove("valid");
			return nput;
		}
		return;
	}
	if (nput.id == "krapin") {
		nput.value = nputext.toLowerCase().toUpperCase();
	}
}

const fetchnewData = () => {
	let memberid = document.getElementById("profileID");
	let newdata = {
		userid: document.getElementById("userID").value,
		memberid: memberid.value,
		usertype: "client",
		entrydate: new Date().toLocaleDateString(),

		firstname: document.getElementById("firstname").value,
		secondname: document.getElementById("secondname").value,
		lastname: document.getElementById("lastname").value,
		birthdate: document.getElementById("dobirth").value,
		fullname: document.getElementById("userfullname").value,

		identity: {
			gender: document.getElementById("gender").value,
			marital: document.getElementById("marital").value,
			idnumber: document.getElementById("idnumber").value,
			Kranumber: document.getElementById("krapin").value,
		},
		contacts: {
			email: document.getElementById("email").value,
			mobile: document.getElementById("phonenum1").value,
			phone: document.getElementById("phonenum2").value,
			contacts: [],
			currentTown: document.getElementById("towncity").value,
		},
		employment: {
			empstatus: document.getElementById("w_status").value,
			emptype: document.getElementById("w_sector").value,
			empsector: document.getElementById("w_sector").value,
			empname: document.getElementById("w_name").value,
			emptittle: document.getElementById("w_tittle").value,
			address: document.getElementById("w_town").value,
		},
		address: {
			country: "Kenya",
			county: document.getElementById("county").value,
			city_town: document.getElementById("towncity").value,
			subcounty: document.getElementById("subcounty").value,
			sublocation: document.getElementById("sublocation").value,
			streetEstate: document.getElementById("streetname").value,
			buildngname: document.getElementById("buildingname").value,
			flrDrNumber: document.getElementById("flrNdoorNumber").value,
			moredetails: document.getElementById("physical_address").value,
		},
		nextofkin: {
			firstname: document.getElementById("nok_name").value,
			othernames: document.getElementById("nok_name").value,
			mobile: document.getElementById("nok_contact").value,
			address: document.getElementById("nok_town").value,
			relation: document.getElementById("nok_relation").value,
		},
		photo: document.getElementById("userimage").dataset.url,
		files: {
			idfront: document.getElementById("IDfront").dataset.url,
			idback: document.getElementById("IDback").dataset.url,
			kracert: document.getElementById("kraCert").dataset.url,
			bizpermit: document.getElementById("bsPermit").dataset.url,
		},
	};
	sessionStorage.setItem("newprofileData", JSON.stringify(newdata));
};

//Exit all dropdowns
window.addEventListener("mouseup", function (e) {
	let elem = e.target;
	let par = elem.parentElement;
	if (par !== current_input.parentElement && e.target !== current_input) {
		document.querySelectorAll(".drodwnlist").forEach((dpdwn) => {
			dpdwn.style.display = "none";
		});
	}
});

// DATA LISTS FILTERS
let sublocations = {
	Changamwe: ["Port Reitz", "Chaani", "Miritini", "Chaani"],
	Jomvu: ["Jomvu Kuu", "Kwa Shee", "Birikani"],
	Kisauni: [
		"Magongoni",
		"Junda",
		"Bamburi",
		"Mwakirunge",
		"Maunguja",
		"Shanzu",
		"Mwembelegeza",
		"Kisauni",
	],
	Nyali: ["Maweni", "Kongowea", "Kongowea"],
	Likoni: ["Mtongwe", "Vijiweni", "Vyemani", "Bofu", "Likoni", "Timbwani"],
	Mvita: [
		"Mji Wa Kale",
		"Makadara",
		"Kizingo",
		"Tudor Estate",
		"Tudor IV",
		"Bondeni",
		"Tononoka",
		"Ganjoni",
		"High Level",
		"Majengo",
		"Mwembe Tayari",
	],
};

const filtered = (obj, arr) => {
	let result = Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));
	return Object.values(result)[0];
};

const dataListfunnel = (nput) => {
	let array = [];
	let ntext = nput.name;
	if (!ntext) return;

	if (ntext == "relations") {
		array = [
			"Mother",
			"Father",
			"Sister",
			"Brother",
			"Spouse",
			"Son",
			"Daughter",
			"Ancle",
			"Other relative",
		];
	} else if (ntext == "towns") {
		array = ["Mombasa", "Nairobi", "Kisumu"];
	} else if (ntext == "counties") {
		array = ["Mombasa", "Nairobi", "Kisumu"];
	} else if (ntext == "subcounties") {
		array = Object.keys(sublocations);
		if (document.getElementById("county").value == "Nairobi") {
			array = [
				"Dagoretti North",
				"Dagoretti South",
				"Embakasi Central",
				"Embakasi East",
				"Embakasi North",
				"Embakasi South",
				"Embakasi West",
				"Kamukunji",
				"Kasarani",
				"Kibra",
				"Langata",
				"Makadara",
				"Mathare",
				"Roysambu",
				"Ruaraka",
				"Starehe",
				"Westlands",
			];
		}
	} else if (ntext == "sublocations") {
		let subcounty = document.getElementById("subcounty");
		array = filtered(sublocations, [subcounty.value]);
	} else if (ntext == "sectors") {
		array = careerSectors;
	} else if (ntext == "tittles") {
		array = [];
	}
	return array;
};

const dropdownData = (nput) => {
	let data = dataListfunnel(nput);
	let temp = [];
	let rf = document.createDocumentFragment();
	if (!nput) {
		data;
	}
	if (nput) {
		let txt = nput.value.toLowerCase();
		temp = data.filter((elem) => elem.toLowerCase().indexOf(txt) > -1);
		if (data.length > 0) {
			data = temp;
		}
	}
	let droplist = current_drpdown.querySelector("ul");
	for (let i = 0; i < data.length; i++) {
		let li = document.createElement("li");
		li.dataset.data = JSON.stringify(data[i]);
		li.innerHTML = "<p>" + data[i] + "</p>";
		rf.appendChild(li);
	}
	droplist.replaceChildren(rf);
};

const dropdownSearch = (nput) => {
	let filtered = dataListfunnel(nput);
	let arrey = filtered;
	if (nput.value == "") {
		current_drpdown.style.display = "none";
		return;
	}
	let txt = nput.value.toLowerCase();
	arrey = filtered.filter((item) => item.toLowerCase().indexOf(txt) > -1);
	let rf = document.createDocumentFragment();
	if (arrey.length > 0) {
		for (let i = 0; i < arrey.length; i++) {
			let li = document.createElement("li");
			li.dataset.data = JSON.stringify(arrey[i]);
			li.innerHTML = "<p>" + arrey[i] + "</p>";
			rf.appendChild(li);
		}
		current_drpdown.querySelector("ul").replaceChildren(rf);
		setnewPosition(current_input.parentElement);
		current_drpdown.style.display = "grid";
	} else {
		current_drpdown.style.display = "none";
	}
};

const CurrentInputSearch = (elem) => {
	if (!elem) return;
	let grandElem = elem.closest(".lb");
	let parElem = elem.parentElement;
	current_input = parElem.querySelector(".nput");
	current_drpdown = grandElem.querySelector(".drodwnlist");
	current_drpdown.style.display = "none";
	dropdownSearch(current_input);
};

//Toggle droplists
const arrowClicked = (arrow) => {
	let prent = arrow.closest(".lb");
	let dropdown = prent.querySelector(".drodwnlist");
	let nput = arrow.parentElement.querySelector("input.nput");
	if (!dropdown) return;
	current_drpdown = dropdown;
	let disp = current_drpdown.style.display;
	current_drpdown.style.display = "none";

	dropdownData(nput);

	if (nput !== current_input) {
		current_input = nput;
		current_drpdown.style.display = "grid";
		setnewPosition(current_input.parentElement);
	} else {
		if (disp !== "" && disp !== "none") {
			current_drpdown.style.display = "none";
		} else {
			current_drpdown.style.display = "grid";
		}
	}
};

// Dropdowns Clicked
document.querySelectorAll(".drodwnlist").forEach((drod) => {
	drod.addEventListener("click", function (e) {
		current_drpdown = drod;
		let li = e.target.closest("li");
		if (!li) return;
		if (li.classList.contains("disabled")) return;
		//if (li.classList.contains("selected")) return;
		let txt = li.innerText.trim();
		let data = JSON.parse(li.dataset.data);
		current_input.dataset.id = data;
		current_input.value = txt;

		if (current_drpdown.id == "dates") {
			getbirthdates();
			let dob = document.getElementById("dobirth");
			dob.dispatchEvent(new Event("input"));
		} else {
			li.classList.add("selected");
			current_input.dispatchEvent(new Event("input"));
		}
		current_drpdown.style.display = "none";
	});
});

let dropdownInputs = current_form.querySelectorAll(".drod .nput");
dropdownInputs.forEach((nput) => {
	nput.addEventListener("input", (e) => {
		if (nput.value !== "") {
			CurrentInputSearch(nput);
		}
	});
});

// ===================================================================

function inputNameswitch(checkinput) {
	let name1 = document.querySelector(".content .pod.i");
	let name2 = document.querySelector(".content .pod.ii");
	let name3 = document.querySelector(".content .pod.iii");
	let name4 = document.querySelector(".content .pod.iv");
	let name5 = document.querySelector(".content .pod.v");
	let name6 = document.querySelector(".content .pod.vi");
	let infoname = document.getElementById("employainfo");

	if (checkinput.value == "business") {
		name1.innerText = "Business sector";
		name2.innerText = "Business name";
		name3.innerText = "Your department";
		name4.innerText = "Your position or tittle";
		name5.innerText = "Your business location";
		name6.innerText = "Your business contact";
		infoname.innerText = "BUSINESS DETAILS";
		return;
	}
	name1.innerText = "Company sector";
	name2.innerText = "Company name";
	name3.innerText = "Current department";
	name4.innerText = "Job position or tittle";
	name5.innerText = "Job location";
	name6.innerText = "Office tel. or email";
	infoname.innerText = "EMPLOYER DETAILS";
}


// INPUT CHANGE LISTENERS ====================================
function startInputListeners() {
	current_form.querySelectorAll(".nput").forEach((nput) => {
		nput.addEventListener("input", (e) => {
			formater(nput);
		});
    	nput.addEventListener("input", (e) => {
        if (nput.id=="w_status") {
         inputNameswitch(nput);
        }
		});
		nput.addEventListener("blur", (e) => {
			fetchnewData();
		});
	});
}
startInputListeners();

function resetClientform() {
	let form = document.querySelector("#clientform form");
	form.reset();
	form.querySelectorAll(".nput[type='file']").forEach((nput) => {
		nput.dataset.url = "";
		nput.dispatchEvent(new Event("input"));
		nput.dispatchEvent(new Event("change"));
	});
	form.querySelectorAll(".nput").forEach((nput) => {
		formater(nput);
	});
	inputNameswitch("");
	currentTab.index = 0;
	next_Tab(0);
}

//CREATE USER-ID  =========================================
function newDocumentID(newRandom) {
	resetClientform();
	let newuserid = document.getElementById("userID");
	let memberid = document.getElementById("profileID");
	const newDocid = [];
	if (!newRandom) return;
	let rNum = newRandom.toString();
	const nums = rNum.match(/.{1,1}/g);
	const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < 7; i++) {
		let strng = str[Math.floor(Math.random() * str.length)];
		newDocid.push(strng, nums[i]);
	}
	newuserid.value = rNum.toString();
	memberid.value = newDocid.join("").toString();
	if (!memberid.value) {
		window.alert("error1 occured!");
		return;
	} else {
		db.collection("clientsList")
			.doc(memberid.value.toString())
			.set({ memberid: memberid.value.toString()})
			.then(()=> {
				document.getElementById("clientform").classList.add("new");
			}) 
	}
}
async function getDocumentIDs() {
	function createnew(data) {
		let random = RandomNumber(100000, 999999);
		if (random.toString().length !== 6 || data.includes(random) == true) {
			createnew(data);
		} else {
			newDocumentID(random);
		}
	}
	const getCollection = await db.collection("clientsList").onSnapshot(
		(querySnapshot) => {
			let DocsIDs = [];
			querySnapshot.forEach((doc) => {
				DocsIDs.push(doc.data().userid);
			});
			if (!DocsIDs) {
				window.alert("error1 occured!");
				return;
			}
			createnew(DocsIDs);
			return getCollection();
		},
		(error) => {
			window.alert("error occured! " + error);
		}
	);
};

// Open FORMS
const openforms = (open) => {
	let clientform = document.getElementById("clientform");
	clientform.classList.remove("new");
	if (!open) return;
	if (open == "new") {
    return getDocumentIDs();
	}
}

const submitNewdata = (btn) => {
	const confirmChanges = (documentId) => {
		db.collection("clientsList")
			.doc(documentId)
			.onSnapshot({includeMetadataChanges: true,},(doc) => {
					alert("Details saved successfully!");
					openforms("");
					current_form.classList.remove("submit");
					sessionStorage.removeItem("newprofileData");
				}
			);
	};

	let notvalid = [];
	btn.disabled = false;
	currentTab.inputs.forEach((nput) => {
		let x = formater(nput);
		if (x) {
			notvalid.push(x);
		}
	});
	currentTab.files.forEach((file) => {
		if (file.id == "bsPermit" || file.id == "kraCert") return;
		if (!file.dataset.url) {
			notvalid.push(file);
		}
	});
	if (notvalid.length > 0) {
		notvalid.forEach((nput) => {
			nput.classList.add("invalid");
		});
		if (notvalid[0].type == "hidden") {
			notvalid[0].parentElement.focus();
		}
		if (notvalid[0].type == "file") {
			notvalid[0].parentElement.focus();
		}
		notvalid[0].focus();
		return;
	}

	if (currentTab.index == 5) {
		btn.disabled = true;
		current_form.classList.add("submit");
		fetchnewData();

		let newdata = JSON.parse(sessionStorage.getItem("newprofileData"));
		let documentId = document.getElementById("profileID").value.toString();
		db.collection("clientsList")
			.doc(documentId)
			.set(newdata, {
				merge: true,
			})
			.then(() => {
				confirmChanges("documentId");
			})
			.catch((error) => {
				console.error("Error saving this client data: ", error);
			});
	} else {
		next_Tab(1);
	}
};


next_Tab(0);

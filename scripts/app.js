
	//'use strict';

	var app = {
	isLoading: true,
	spinner: document.querySelector('.loader'),
    container: document.querySelector('.main')
	};

	//if (app.isLoading) {
	//  app.spinner.setAttribute('hidden', true);
	//  app.container.removeAttribute('hidden');
	//  app.isLoading = false;
	//}
	
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  
  
  app.saveTestDataXXX = function(){
	alert("hello world too");
  }
  
  
  function saveTestData(){
	alert("hello world");
	try{
		localStorage.clients = "Adam Ant, Barry Bat";
	}
	catch(e){
		alert("in catch - e: " + e);
	}
  }
  
  function retrieveTestData(){
	alert("hello world 2");
	try{
		alert(localStorage.clients);
	}
	catch(e){
		alert("in catch - e: " + e);
	}
  }
  
    // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };

// START - global variables
DEVMODE = 1; // Checked to see if developer screens must be displayed
ACTION = new Array(); // Actions available in a specific context
USER = ""; // Authenticated user
LANG = "eng"; // Application language defaulted to English

OBJATTR = new Array(); // Attributes of object
DATA = new String(""); // All data for current object. Single or multiple rows
// END - global variables

//	START - constants
C_NEXT = "next";
C_START = "start";
C_BACK = "back";
C_DONE = "done";
//	END - constants

function initialise(){ // Body onload
alert("in initialise()");
	navTo(0);
}

function setActionData(bInit, sText, iPage, iType){ // Build up the action button data 
	if(bInit == 1){
		ACTION.length = 0;
	}
	ACTION[ACTION.length] = new Array();
	ACTION[ACTION.length - 1][0] = sText;
	ACTION[ACTION.length - 1][1] = iPage;
	ACTION[ACTION.length - 1][2] = iType;
}

function buildActionButtons(){ // Build all action buttons according to action button data
	i = 0;
	
	var aClass = new Array("btnBack", "btnNext");
	
	var s =
	"<div style='position: absolute; top:95%; width:100%'>" +
	"<center>" +
	"<table>" +
	"<tr>";
	
	for(i=0; i<ACTION.length; i++){
	s += "<td>";
	s += "<input type='button' value='" + ACTION[i][0] + "' onclick='navTo(" + ACTION[i][1] + ")' class='" + aClass[ACTION[i][2]] + "'>";
	s += "</td>";
	}
	
	s += "</tr>" +
	"</table" +
	"</center>" +
	"</div>";
	
	return s;
}

function navTo(i){ // Generic eval to navigate to any build page function
	try{
		divPage.innerHTML = eval("buildPage" + i + "()");
		
		if(DEVMODE == 1){
		divQuickNav.innerHTML = buildQuickNav();
		}
	}
	catch(e){
		alert("page " + i + " not found");
	}
}

function buildHeader(sContext, iPage){ // App wide standard header including context passed in and page number
	var s =
	"<div class='hdrBar'>" +
	"<table style='width:100%'>" +
	"<tr>" +
	"<td style='width:10%'>&equiv;" +
	"</td>" +
	"<td style='width:10%'>FNA" +
	"</td>" +
	"<td style='width:60%; text-align:center'>" + sContext;
	if(DEVMODE == 1){
	s += " (Page: " + iPage + ")";
	}
	s +=
	"</td>" +
	"<td style='width:20%; text-align:right'>&vellip;" +
	"</td>" +
	"</tr>" +
	"</table>" +
	"</div>";
	
	return s;
}

function setContentData(){
}

function buildContentCRUD(sObj){
	var s =
	"<center>" +
	"<table>";
	var i = new Number(0);
	
	for(i=0;i<OBJATTR[sObj].length;i++){
		switch(OBJATTR[sObj][i]["type"]){
			case "s":
				s += buildInputField(sObj, i);
				break;
			case "p":
				s += buildPasswordField(sObj, i);
				break;
			default:
				alert("no attribute type match");
				break;
		}
	}
	
	s += "</table>" +
	"</center>";
	
	return s;
}

function buildContentDisplay(sObj){
	var s =
	"<table>";
	var i = new Number(0);
	
	for(i=0; i<OBJATTR[sObj].length; i++){
		switch(OBJATTR[sObj][i]["type"]){
			case "s":
				s += buildDisplayField(sObj, i);
				break;
			case "n":
				s += buildDisplayField(sObj, i);
				break;
			default:
				alert("no attribute type match");
				break;
		}
	}
	
	s += 
	"</table>";
	
	return s;
}

function buildInputField(sObj, i){
	var s =
	"<tr>" +
	"<td>";
	s += deriveLabelForLanguage(sObj, i);
	s +=
	"</td>" +
	"<td>" +
	"<input type='text' style='width: 200px; length:50'>" +
	"</td>" +
	"<td>";
	s += buildInfo(sObj, i);
	s +=
	"</td>" +
	"</tr>";
	
	return s;
}

function buildDisplayField(sObj, i){
	var s =
	"<tr>" +
	"<td>";
	s += deriveLabelForLanguage(sObj, i);
	s +=
	"</td>" +
	"<td>" +
	"<p>data...</p>" +
	"</td>" +
	"</tr>";
	
	return s;
}

function buildPasswordField(sObj, i){
	s =
	"<tr>" +
	"<td>";
	s += deriveLabelForLanguage(sObj, i);
	s +=
	"</td>" +
	"<td>" +
	"<input type='password' style='width: 100px; length:50'>" +
	"</td>" +
	"<td>";
	s += buildInfo(sObj, i);
	s +=
	"</td>" +
	"</tr>";
	
	return s;
}

function deriveLabelForLanguage(sObj, i){
	if(OBJATTR[sObj][i]["label"][LANG] > ""){
		return OBJATTR[sObj][i]["label"][LANG];
	}
	else{ // default to English if other language not set
		return OBJATTR[sObj][i]["label"]["eng"];
	}
}

function buildInfo(sObj, i){
	if(OBJATTR[sObj][i]["info"][LANG] > ""){
		var s = "" +
		"<input type='button' value='i' onclick='showInfo(" + '"' + sObj + '"' + ", " + i + ", this)'";
		return s;
	}
	else{
		return "&nbsp;" 
	}
}

function showInfo(sObj, i, o){
	divInfoText.innerHTML = OBJATTR[sObj][i]["info"][LANG];
	//divInfo.style.top = 100px;
	//divInfo.style.left = 200px;
	divInfo.style.visibility = "visible";
}

function buildQuickNav(){
	var s = "";
	var i = 0;
	
	for (i=0; i<101; i++){
		s += "<input type='button' value='" + i + "' onclick='navTo(" + i + ")' style='width:35px'><br>";
	}
	
	return s;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function setAttributes_User(){
	OBJATTR["objUser"] = new Array();
	OBJATTR["objUser"][0] = new Array();
	OBJATTR["objUser"][0]["name"] = "userID"
	OBJATTR["objUser"][0]["label"] = new Array();
	OBJATTR["objUser"][0]["label"]["afr"] = "Gebruiker ID";
	OBJATTR["objUser"][0]["label"]["eng"] = "User ID";
	OBJATTR["objUser"][0]["type"] = "s";
	OBJATTR["objUser"][0]["length"] = "50";
	OBJATTR["objUser"][0]["domain"] = "";
	OBJATTR["objUser"][0]["info"] = new Array();
	OBJATTR["objUser"][0]["info"]["afr"] = "Enter the user ID allocated to you by the administrator";
	OBJATTR["objUser"][0]["info"]["eng"] = "Enter the user ID allocated to you by the administrator";
	OBJATTR["objUser"][0]["default"] = "";
	OBJATTR["objUser"][0]["editable"] = "1";
	OBJATTR["objUser"][0]["display"] = "2";
	
	OBJATTR["objUser"][1] = new Array();
	OBJATTR["objUser"][1]["name"] = "password"
	OBJATTR["objUser"][1]["label"] = new Array();
	OBJATTR["objUser"][1]["label"]["afr"] = "Paswoord";
	OBJATTR["objUser"][1]["label"]["eng"] = "Password";
	OBJATTR["objUser"][1]["type"] = "p";
	OBJATTR["objUser"][1]["length"] = "50";
	OBJATTR["objUser"][1]["domain"] = "";
	OBJATTR["objUser"][1]["info"] = new Array();
	OBJATTR["objUser"][1]["info"]["afr"] = "Enter the password you chose";
	OBJATTR["objUser"][1]["info"]["eng"] = "Enter the password you chose";
	OBJATTR["objUser"][1]["default"] = "";
	OBJATTR["objUser"][1]["editable"] = "1";
	OBJATTR["objUser"][1]["display"] = "2";
}

function setAttributes_Client(){
	OBJATTR["objClient"] = new Array();
	OBJATTR["objClient"][0] = new Array();
	OBJATTR["objClient"][0]["name"] = "firstname"
	OBJATTR["objClient"][0]["label"] = new Array();
	OBJATTR["objClient"][0]["label"]["eng"] = "First name";
	OBJATTR["objClient"][0]["type"] = "s";
	OBJATTR["objClient"][0]["length"] = "50";
	OBJATTR["objClient"][0]["domain"] = "";
	OBJATTR["objClient"][0]["info"] = new Array();
	OBJATTR["objClient"][0]["info"]["afr"] = "";
	OBJATTR["objClient"][0]["info"]["eng"] = "";
	OBJATTR["objClient"][0]["default"] = "";
	OBJATTR["objClient"][0]["editable"] = "1";
	OBJATTR["objClient"][0]["display"] = "2";
	
	OBJATTR["objClient"][1] = new Array();
	OBJATTR["objClient"][1]["name"] = "surname"
	OBJATTR["objClient"][1]["label"] = new Array();
	OBJATTR["objClient"][1]["label"]["eng"] = "Surname";
	OBJATTR["objClient"][1]["type"] = "s";
	OBJATTR["objClient"][1]["length"] = "50";
	OBJATTR["objClient"][1]["domain"] = "";
	OBJATTR["objClient"][1]["info"] = new Array();
	OBJATTR["objClient"][1]["info"]["afr"] = "";
	OBJATTR["objClient"][1]["info"]["eng"] = "";
	OBJATTR["objClient"][1]["default"] = "";
	OBJATTR["objClient"][1]["editable"] = "1";
	OBJATTR["objClient"][1]["display"] = "2";
	
	OBJATTR["objClient"][2] = new Array();
	OBJATTR["objClient"][2]["name"] = "age"
	OBJATTR["objClient"][2]["label"] = new Array();
	OBJATTR["objClient"][2]["label"]["eng"] = "Age";
	OBJATTR["objClient"][2]["type"] = "n";
	OBJATTR["objClient"][2]["length"] = "3";
	OBJATTR["objClient"][2]["domain"] = "";
	OBJATTR["objClient"][2]["info"] = new Array();
	OBJATTR["objClient"][2]["info"]["afr"] = "";
	OBJATTR["objClient"][2]["info"]["eng"] = "";
	OBJATTR["objClient"][2]["default"] = "";
	OBJATTR["objClient"][2]["editable"] = "1";
	OBJATTR["objClient"][2]["display"] = "2";	
	
	OBJATTR["objClient"][3] = new Array();
	OBJATTR["objClient"][3]["name"] = "maritalstatus"
	OBJATTR["objClient"][3]["label"] = new Array();
	OBJATTR["objClient"][3]["label"]["eng"] = "Marital status";
	OBJATTR["objClient"][3]["type"] = "s";
	OBJATTR["objClient"][3]["length"] = "50";
	OBJATTR["objClient"][3]["domain"] = "maritalstatus";
	OBJATTR["objClient"][3]["info"] = new Array();
	OBJATTR["objClient"][3]["info"]["afr"] = "";
	OBJATTR["objClient"][3]["info"]["eng"] = "";
	OBJATTR["objClient"][3]["default"] = "";
	OBJATTR["objClient"][3]["editable"] = "1";
	OBJATTR["objClient"][3]["display"] = "2";		
}

function setAttributes_Spouse(){
	OBJATTR["objSpouse"] = new Array();
	OBJATTR["objSpouse"][0] = new Array();
	OBJATTR["objSpouse"][0]["name"] = "firstname"
	OBJATTR["objSpouse"][0]["label"] = new Array();
	OBJATTR["objSpouse"][0]["label"]["eng"] = "Spouse";
	OBJATTR["objSpouse"][0]["type"] = "s";
	OBJATTR["objSpouse"][0]["length"] = "50";
	OBJATTR["objSpouse"][0]["domain"] = "";
	OBJATTR["objSpouse"][0]["info"] = new Array();
	OBJATTR["objSpouse"][0]["info"]["afr"] = "";
	OBJATTR["objSpouse"][0]["info"]["eng"] = "";
	OBJATTR["objSpouse"][0]["default"] = "";
	OBJATTR["objSpouse"][0]["editable"] = "1";
	OBJATTR["objSpouse"][0]["display"] = "2";		
}

function setAttributes_Dependant(){
	OBJATTR["objDependant"] = new Array();
	OBJATTR["objDependant"][0] = new Array();
	OBJATTR["objDependant"][0]["name"] = "firstname"
	OBJATTR["objDependant"][0]["label"] = new Array();
	OBJATTR["objDependant"][0]["label"]["eng"] = "Dependants";
	OBJATTR["objDependant"][0]["type"] = "s";
	OBJATTR["objDependant"][0]["length"] = "50";
	OBJATTR["objDependant"][0]["domain"] = "";
	OBJATTR["objDependant"][0]["info"] = new Array();
	OBJATTR["objDependant"][0]["info"]["afr"] = "";
	OBJATTR["objDependant"][0]["info"]["eng"] = "";
	OBJATTR["objDependant"][0]["default"] = "";
	OBJATTR["objDependant"][0]["editable"] = "1";
	OBJATTR["objDependant"][0]["display"] = "2";		
}

function buildPage0(){

	setAttributes_User();
	
	var s = buildHeader("Login", 0);
	
	s += buildContentCRUD("objUser");
		
	if(DEVMODE == 1){
		setActionData(1, C_START, 1, 1);
		s += buildActionButtons();
	}
	else{
		setActionData(1, C_START, 2, 1);
		s += buildActionButtons();
	}
		
	return s;
}

function buildPage1(){	
	var s = buildHeader("DEV Cover Page", 1);
	
	s +=
	"<center>" +
	"<table><tr><td>" +
	"<br>" +
	"Solution approach:" +
	"<ul>" +
	"<li>Implementation is SPA PWA</li>" +
	"<li>Look is simple / clean</li>" +
	"<li>Responsive</li>" +
	"<li>Primary UI orientation is landscape</li>" +
	"<li>Interactive single point dev and test site</li>" +
	"</ul>" +
	"</td></tr></table>" +
	"</center>" +
	"<br>" +
	"<br>" +
	"<center>" +
	"<table><tr><td>" +
	"<strong>Conventions:</strong>" +
	"<br>" +
	"Page structure - \"user mode\"" +
	"<ul>" +
	"<li>Context header</li>" +
	"<li>Nav home</li>" +
	"<li>Info</li>" +
	"<li>Page purpose</li>" +
	"<li>Page content</li>" +
	"<li>Actions</li>" +
	"</ul>" +
	"Page structure - \"dev mode\"" +
	"<ul>" +
	"<li>\"user mode\" +</li>" +
	"<li>Page number</li>" +
	"<li>Interactive notes</li>" +
	"<li>Dev progress bar</li>" +
	"</ul>" +
	"</td></tr></table>" +
	"</center>";
	
	setActionData(1, C_BACK, 0, 0);
	setActionData(0, C_NEXT, 2, 1);
	
	s += buildActionButtons();
	
	return s;
}

function buildPage2(){	

	setAttributes_Client();
	setAttributes_Spouse();
	setAttributes_Dependant();
	
	var s = buildHeader("Home Page", 2);
	
	var sWrk =
	"<center>" +
	"<table style='width:50%'>" +
	"<tr>" +
	"<td style='width:50%'>" +
	"<div class='divDashBlock' onclick='navTo(3)'>" +
	"<div class='divDashHdr'>Client</div>" +
	"<center>";
	sWrk += buildContentDisplay("objClient");
	sWrk += buildContentDisplay("objSpouse");
	sWrk += buildContentDisplay("objDependant") +
	"</center>" +
	"</div>" +
	"</td>" +
	"<td style='width:50%'>" +
	"<div class='divDashBlock'>" +
	"<div class='divDashHdr'>Estate</div>" +
	"<center>" +
	"<table>" +
	"<tr>" +
	"<td>" +
	"Total assets:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"Liquid assets:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"Liabilities:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"Liquidity shortfall:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"Liquidity shortfall:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"</table>" +
	"<center>" +
	"</div>" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"<div class='divDashBlock'>" +
	"<div class='divDashHdr'>Retirement</div>" +
	"&nbsp;" +
	"</div>" +
	"</td>" +
	"<td>" +
	"<div class='divDashBlock'>" +
	"<div class='divDashHdr'>Providing</div>" +
	"<center>" +
	"<table>" +
	"<tr>" +
	"<td>" +
	"Death:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"<tr>" +
	"<td>" +
	"Disability:" +
	"</td>" +
	"<td>" +
	"R 0.00" +
	"</td>" +
	"</tr>" +
	"</table>" +
	"<center>" +
	"</div>" +
	"</td>" +
	"</tr>" +
	"</table>" +
	"</center>";
	
		
	
	s += sWrk;
	
	
	
	sWrk =
	"<center>" +
	"<table style='width:50%'>" +
	"<tr>" +
	"<td style='height:200px; width:50%'>" +
	"<div class='divDashBlock' onclick='navTo(3)'>" +
	"<div class='divDashHdr'>Trusts</div>" +
	"<center>" +
	"&nbsp;" +
	"</center>" +
	"</div>" +
	"</td>" +
	"<td style='height:200px; width:50%'>" +
	"<div class='divDashBlock' onclick='navTo(3)'>" +
	"<div class='divDashHdr'>Businesses</div>" +
	"<center>" +
	"&nbsp;" +
	"</center>" +
	"</div>" +
	"</td>" +
	"</tr>" +
	"</table>" +
	"</center>";
	
	
	s += sWrk;
	
	
	
	
	s += "<div style='position:absolute; top:70%; width:100%'";
	s += "<table style='width:100%'><tr><td>";
	s += '<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" style="width:50px; height:50px; background-color:yellow">target</div>';
	s += "</td><td width=200px>&nbsp;</td><td>";

	s += '<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)" style="width:50px; height:50px; background-color:lime">target</div>'
	s += "</td></tr></table>";
	
	

	s += '<div id="drag1" draggable="true" ondragstart="drag(event)">drag this</div>'	
	s += "</div>";
	
	
	
	
	
	
	if(DEVMODE == 1){
		setActionData(1, C_BACK, 0, 0);
		setActionData(0, C_NEXT, 2, 1);
		s += buildActionButtons();
	}
	else{
		setActionData(1, C_BACK, 0, 0);
		setActionData(0, C_NEXT, 2, 1);
		s += buildActionButtons();
	}
	
	return s;
}

function buildPage3(){	

	setAttributes_Client();
	setAttributes_Spouse();
	setAttributes_Dependant();
	
	var s = buildHeader("Client Page", 3);
	
	var sWrk =
	"<center>" +
	"<button onclick='saveTestData();'>save test data</button>" +
	"<button onclick='retrieveTestData();'>retrieve test data</button>" +
	"</center>";
		
	s += sWrk;
	
	setActionData(1, C_DONE, 2, 1);

	s += buildActionButtons();
	
	return s;
}


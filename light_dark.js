/*var flag=true;

function toggle_theme(){
	const topnavLinks = document.querySelectorAll('.topnav a');
	const changeTopnavLinkColor = (color) => {
		topnavLinks.forEach(link => {
			link.style.color = color;
		});
	};
	
	const stockNameLinks = document.querySelectorAll('.stock_name');
	const changestockNameColor = (color) => {
		stockNameLinks.forEach(link => {
			link.style.color = color;
		});
	};
	
	
	
	if(flag){	//currently in dark mode 
		document.body.style.backgroundColor="white";
		document.getElementById("name").style.color="black";
		document.getElementById('mode-icon').src="night-icon.png";
		changeTopnavLinkColor('black');
		changestockNameColor('black');
		document.querySelectorAll('.footer').forEach(link => {
			link.style.color = 'black';
		});
		document.querySelectorAll('.subscription-button:hover ').forEach(link => {
			link.style.color = 'black';
			link.style.backgroundColor='white';
		});
		
		flag=false;
	}else{		//currently in light mode
		document.body.style.backgroundColor="black";
		document.getElementById("name").style.color="white";
		document.getElementById('mode-icon').src="sunny-icon.png";
		changeTopnavLinkColor('white');
		changestockNameColor('white');
		document.querySelectorAll('.footer').forEach(link => {
			link.style.color = 'white';
		});
		document.querySelectorAll('.subscription-button:hover ').forEach(link => {
			link.style.color = 'white';
			link.style.backgroundColor='black';
		});
		
		flag=true;
	}
}*/

var flag = true;
document.querySelectorAll('.subscription-button').forEach(button => {
	button.classList.add('dark-mode');
	button.classList.remove('light-mode');
});

function toggle_theme() {
	const topnavLinks = document.querySelectorAll('.topnav a');
	const stockNameLinks = document.querySelectorAll('.stock_name');
	const footers = document.querySelectorAll('.footer');
	const subscriptionButtons = document.querySelectorAll('.subscription-button');

	const changeTopnavLinkColor = (color) => {
		topnavLinks.forEach(link => {
			link.style.color = color;
		});
	};

	const changestockNameColor = (color) => {
		stockNameLinks.forEach(link => {
			link.style.color = color;
		});
	};

	if (flag) { // currently in dark mode
		document.body.style.backgroundColor = "white";
		document.getElementById("name").style.color = "black";
		document.getElementById('mode-icon').src = "night-icon.png";
		changeTopnavLinkColor('black');
		changestockNameColor('black');
		footers.forEach(link => {
			link.style.color = 'black';
		});
		subscriptionButtons.forEach(button => {
			button.classList.add('light-mode');
			button.classList.remove('dark-mode');
		});

		flag = false;
	} else { // currently in light mode
		document.body.style.backgroundColor = "black";
		document.getElementById("name").style.color = "white";
		document.getElementById('mode-icon').src = "sunny-icon.png";
		changeTopnavLinkColor('white');
		changestockNameColor('white');
		footers.forEach(link => {
			link.style.color = 'white';
		});
		subscriptionButtons.forEach(button => {
			button.classList.add('dark-mode');
			button.classList.remove('light-mode');
		});

		flag = true;
	}
}

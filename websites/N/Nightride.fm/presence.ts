const presence = new Presence({
		clientId: "993215633351245964",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/HnZw53P.png",
		},
		songName = `${document.querySelector("#npArtist").textContent} ${
			document.querySelector("#npTitle").textContent
		}`;

	let state;
	if (document.querySelector("body").className.includes("playing")) {
		state = "Playing";
		presenceData.smallImageKey = "play";
		presenceData.smallImageText = "Playing";
		presenceData.startTimestamp = browsingTimestamp;
	} else {
		state = "Paused";
		presenceData.smallImageKey = "pause";
		presenceData.smallImageText = "Paused";
		presenceData.endTimestamp;
	}

	presenceData.state = `${state}: ${songName}`;
	presenceData.buttons = [
		{ label: "Go to station", url: document.location.href },
	];

	if (document.location.pathname.includes("/stations"))
		presenceData.details = "Viewing stations";
	else if (document.location.pathname.includes("/news"))
		presenceData.details = "Viewing news";
	else if (document.location.pathname.includes("/milkdrop"))
		presenceData.details = "Viewing milkdrop";
	else if (document.location.pathname.includes("/chat"))
		presenceData.details = "Viewing chat";
	else if (document.location.pathname.includes("/archive"))
		presenceData.details = "Viewing archives";
	else if (document.location.pathname.includes("releases"))
		presenceData.details = "Viewing releases";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Viewing details of Nightride.fm";
	else delete presenceData.details;

	presence.setActivity(presenceData);
});

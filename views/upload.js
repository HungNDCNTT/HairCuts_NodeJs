const url = "https://res.cloudinary.com/softss/image/upload/";
const form = document.querySelector("form");
let ts = responseFromServer.timestamp;
let sig = responseFromServer.signature;


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();
    console.log("dsda")
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("api_key", "799882167926469");
        formData.append("timestamp", ts);
        formData.append("signature", "8C:19:D8:59:CC:F3:DA:00:D8:AA:E3:D7:65:8D:3C:BA:68:17:B9:F4");
        formData.append("file", file);
        formData.append("upload_preset", "docs_upload_example_us_preset");

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                document.getElementById("data").innerHTML += data;
            });
    }
});
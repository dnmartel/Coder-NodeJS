document.getElementById("submit").onsubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
            username: username.value
        })
    }).then(({ ok, url }) => {
        if (!ok) {
            return;
        }
        location.href = url;
    });
};

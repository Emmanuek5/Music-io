const forms = document.querySelector("form");

forms.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(forms);
  const data = Object.fromEntries(formData);
  console.log(data);
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});

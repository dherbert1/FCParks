document.getElementById("reviewForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  if (name && comment) {
    let reviewItem = document.createElement("li");
    reviewItem.innerHTML = `<strong>${name}:</strong> ${comment}`;
    document.getElementById("reviewsList").prepend(reviewItem);
    document.getElementById("reviewForm").reset();
  }
});
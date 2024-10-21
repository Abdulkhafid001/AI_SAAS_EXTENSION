// document.addEventListener("DOMContentLoaded", function () {
//   const colors = ["red", "green", "blue", "yellow"];

//   colors.forEach((color) => {
//     document.getElementById(color).addEventListener("click", function () {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           function: changeBackgroundColor,
//           args: [color],
//         });
//       });
//     });
//   });
// });

// function changeBackgroundColor(color) {
//   document.body.style.backgroundColor = color;
// }

document.addEventListener("DOMContentLoaded", function () {
  const colors = ["red", "green", "blue", "yellow"];

  colors.forEach((color) => {
    document.getElementById(color).addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "changeColor",
          color: color,
        });
      });
    });
  });
});

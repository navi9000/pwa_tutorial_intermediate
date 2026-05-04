const template = `<article>
  <img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>
  <h3>#POS. NAME</h3>
  <ul>
  <li><span>Author:</span> <strong>AUTHOR</strong></li>
  <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>
  <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>
  <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>
  </ul>
</article>`
let content = ""
for (const game of games) {
  const entry = template
    .replace(/POS/g, i + 1)
    .replace(/SLUG/g, game.slug)
    .replace(/NAME/g, game.name)
    .replace(/AUTHOR/g, game.author)
    .replace(/WEBSITE/g, game.website)
    .replace(/GITHUB/g, game.github)
    .replace("<a href='http:///'></a>", "-")
  content += entry
}
document.getElementById("content").innerHTML = content

// Registering Service Worker
let swRegistration = null

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/pwa-examples/js13kpwa/sw.js")
    .then((reg) => {
      swRegistration = reg
    })
}

// Requesting permission for Notifications after clicking on the button
const button = document.getElementById("notifications")
button.addEventListener("click", () => {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification()
    }
  })
})

// Setting up random Notification
function randomNotification() {
  if (!swRegistration) return
  const randomItem = Math.floor(Math.random() * games.length)
  const notifTitle = games[randomItem].name
  const notifBody = `Created by ${games[randomItem].author}.`
  const notifImg = `data/img/${games[randomItem].slug}.jpg`
  const options = {
    body: notifBody,
    icon: notifImg,
  }
  swRegistration.showNotification(notifTitle, options)
  setTimeout(randomNotification, 30000)
}

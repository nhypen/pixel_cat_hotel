# 🐱 Pixel Cat Hotel

**Pixel Cat Hotel** is a browser-based pixel-style management game where you run a small hotel designed especially for cats.

Your job is to take care of your feline guests, keep their rooms clean, satisfy their needs, and earn coins by keeping them happy.

## 🎮 Play the Game

The game is available directly in your browser through **GitHub Pages**.

**Live Demo:**
`https://nhypen.github.io/Pixel_Cat_Hotel/`

Replace `nhypen` and `Pixel_Cat_Hotel` with the name of your GitHub account and repository.

## 🏨 About the Game

Each cat stays in its own hotel room and moves around independently.

Cats have different needs that decrease over time. The player can select a cat and tell it to perform an activity.

Instead of instantly changing a statistic, the cat walks to the appropriate object in its room and performs the selected action.

For example:

* 🍗 **Feed** — the cat walks to its food bowl and eats.
* 💤 **Sleep** — the cat walks to its bed and rests.
* 🧶 **Play** — the cat walks to its toy and plays.
* 🚽 **Litter Box** — the cat walks to the litter box.
* 🧹 **Clean Room** — removes dirt from the selected cat's room.

## 🐾 Cat Needs

Every hotel guest has several needs:

* **Food**
* **Energy**
* **Fun**
* **Litter Box**
* **Happiness**

When one of the needs becomes low, a small icon appears above the cat to show what it needs.

The overall happiness of a cat depends on its needs and the cleanliness of its room.

## 🐱 Pixel Cats

Cats are displayed as animated pixel-style characters.

They can:

* walk around their rooms,
* move toward furniture,
* sleep,
* eat,
* play,
* use the litter box,
* display need bubbles,
* react to player commands.

Cats can also have different names and coat colors, making hotel guests visually different from one another.

## 🏨 Hotel Management

The hotel starts with **four rooms**.

Each room contains:

* a bed,
* a food bowl,
* a litter box,
* a scratching post,
* a toy,
* a rug,
* a window.

The player can accept new guests whenever a room is available.

Additional hotel rooms can be purchased using coins earned from guests.

## 🧹 Room Cleanliness

Rooms become dirty while cats stay in the hotel.

Dirt negatively affects a cat's happiness, so rooms need to be cleaned regularly.

Cleaning a room costs a small number of coins.

## 💰 Economy

Cats generate income during their stay.

The amount of money earned depends on how happy the guests are.

When a cat finishes its stay, a happy guest can leave an additional tip.

Keeping cats satisfied also improves the hotel's reputation.

## ⭐ Reputation

The hotel has a reputation system.

Taking good care of guests increases reputation, while unhappy cats can lower it.

A high level of guest satisfaction is therefore important for both reputation and income.

## ☀️ Day and Night Cycle

The game includes a day and night cycle.

The environment changes visually between daytime and nighttime, including changes to the sky, hotel rooms, windows, and lighting.

Hotel guests also continue generating income as the in-game days pass.

## 💾 Save System

Game progress is automatically stored in the browser using `localStorage`.

The game saves information such as:

* coins,
* hotel reputation,
* current day,
* hotel rooms,
* cats,
* cat needs,
* room cleanliness.

This means progress remains available after refreshing or reopening the page in the same browser.

## 🛠️ Technologies

Pixel Cat Hotel was created using:

* **HTML5**
* **CSS3**
* **JavaScript**
* **LocalStorage**
* **GitHub Pages**

No external game engine or framework is required.

## 📁 Project Structure

```text
├── index.html
├── style.css
├── script.js
```

### `index.html`

Contains the main structure and interface of the game.

### `style.css`

Contains the pixel-style graphics, hotel design, cat appearance, animations, user interface, and day/night visual effects.

### `script.js`

Contains the main game logic, including cat movement, needs, activities, economy, hotel management, room cleanliness, day/night cycle, and save system.


After deployment, the game will be available through the GitHub Pages URL assigned to the repository.

## 🎯 Goal

The goal of Pixel Cat Hotel is to manage the hotel efficiently, keep every feline guest happy, maintain clean rooms, earn coins, improve the hotel's reputation, and expand the hotel.

Take care of your guests and build a successful Pixel Cat Hotel! 🐱🏨

## Author
nhypen

// ==========================================================
// PIXEL CAT HOTEL
// ==========================================================


// ==========================================================
// GAME STATE
// ==========================================================

let coins = 200;

let reputation = 1;

let day = 1;

let roomCount = 4;

let selectedCatId = null;

let nextCatId = 1;

let isNight = false;

let cats = [];

let rooms = [];


// ==========================================================
// CAT DATABASE
// ==========================================================

const catNames = [
    "Mochi",
    "Luna",
    "Pixel",
    "Milo",
    "Nori",
    "Kiki",
    "Yuki",
    "Cookie",
    "Mimi",
    "Boba",
    "Tofu",
    "Sushi",
    "Pudding",
    "Oreo",
    "Mango",
    "Nala",
    "Miso",
    "Neko",
    "Leo",
    "Chmurka"
];


// ==========================================================
// CAT APPEARANCES
// ==========================================================

const catStyles = [

    // orange

    {
        main: "#e5a04e",
        dark: "#8b572d",
        light: "#ffd08d",
        patch: "#c77a35"
    },


    // cream

    {
        main: "#ead2ad",
        dark: "#9d7b5c",
        light: "#fff1d3",
        patch: "#c49f78"
    },


    // grey

    {
        main: "#8d929c",
        dark: "#525660",
        light: "#cfd2d8",
        patch: "#656a74"
    },


    // black

    {
        main: "#48454d",
        dark: "#28262c",
        light: "#77737d",
        patch: "#36343b"
    },


    // white

    {
        main: "#eeeeea",
        dark: "#a8a8a1",
        light: "#ffffff",
        patch: "#c8b6ac"
    },


    // brown

    {
        main: "#a87253",
        dark: "#674432",
        light: "#d6a27d",
        patch: "#81543d"
    },


    // lavender

    {
        main: "#aca2c6",
        dark: "#6b6283",
        light: "#ddd5ec",
        patch: "#887ca3"
    },


    // calico

    {
        main: "#f1e4ce",
        dark: "#8c7568",
        light: "#ffffff",
        patch: "#d9854e"
    }

];


// ==========================================================
// ROOM LOCATIONS
// ==========================================================

const locations = {

    bed: {
        x: 55,
        y: 232
    },

    food: {
        x: 395,
        y: 242
    },

    toilet: {
        x: 315,
        y: 240
    },

    play: {
        x: 395,
        y: 165
    }

};


// ==========================================================
// RANDOM HELPERS
// ==========================================================

function random(min, max) {

    return Math.floor(
        Math.random()
        *
        (
            max
            - min
            + 1
        )
    )
    + min;

}


function randomItem(array) {

    return array[
        Math.floor(
            Math.random()
            *
            array.length
        )
    ];

}


// ==========================================================
// INITIALIZE ROOMS
// ==========================================================

function initializeRooms() {

    rooms = [];

    for (
        let i = 0;
        i < roomCount;
        i++
    ) {

        rooms.push({

            id: i,

            dirt: 0

        });

    }

}


// ==========================================================
// CREATE CAT
// ==========================================================

function createCat(roomIndex) {

    const style =
        randomItem(
            catStyles
        );


    return {

        id:
            nextCatId++,

        name:
            randomItem(
                catNames
            ),

        room:
            roomIndex,

        main:
            style.main,

        dark:
            style.dark,

        light:
            style.light,

        patch:
            style.patch,

        hunger:
            random(
                65,
                95
            ),

        energy:
            random(
                65,
                95
            ),

        fun:
            random(
                65,
                95
            ),

        toilet:
            random(
                70,
                100
            ),

        happiness:
            80,

        stayDays:
            random(
                3,
                6
            ),

        x:
            random(
                100,
                330
            ),

        y:
            random(
                150,
                220
            ),

        busy:
            false,

        currentAction:
            null,

        walking:
            false,

        direction:
            1

    };

}


// ==========================================================
// ADD GUEST
// ==========================================================

function addGuest() {

    const occupied =
        cats.map(
            cat =>
                cat.room
        );


    let freeRoom =
        null;


    for (
        let i = 0;
        i < roomCount;
        i++
    ) {

        if (
            !occupied.includes(i)
        ) {

            freeRoom = i;

            break;

        }

    }


    if (
        freeRoom === null
    ) {

        addMessage(
            "🏨 Wszystkie pokoje są zajęte."
        );

        return;

    }


    const cat =
        createCat(
            freeRoom
        );


    cats.push(cat);


    addMessage(
        `🛎 ${cat.name} zameldował się w pokoju ${freeRoom + 1}.`
    );


    saveGame();

    renderHotel();

}


// ==========================================================
// BUY ROOM
// ==========================================================

function buyRoom() {

    const price =
        getRoomPrice();


    if (
        coins < price
    ) {

        addMessage(
            "💸 Za mało monet na nowy pokój."
        );

        return;

    }


    coins -= price;


    rooms.push({

        id:
            roomCount,

        dirt:
            0

    });


    roomCount++;


    addMessage(
        `🏗 Wybudowano pokój ${roomCount}.`
    );


    saveGame();

    renderHotel();

}


// ==========================================================
// ROOM PRICE
// ==========================================================

function getRoomPrice() {

    return (
        400
        +
        (
            roomCount
            - 4
        )
        *
        180
    );

}


// ==========================================================
// HOTEL RENDER
// ==========================================================

function renderHotel() {

    const hotel =
        document.getElementById(
            "hotel"
        );


    hotel.innerHTML =
        "";


    for (
        let i = 0;
        i < roomCount;
        i++
    ) {

        const roomData =
            rooms[i];


        const room =
            document.createElement(
                "div"
            );


        room.className =
            "room";


        room.id =
            `room-${i}`;


        room.innerHTML = `

            <div class="room-number">
                ROOM ${i + 1}
            </div>


            <div class="window"></div>


            <div class="rug"></div>


            <div class="bed"></div>


            <div class="scratcher"></div>


            <div class="litter"></div>


            <div class="food-area">

                <div class="food-dots">
                    ● ● ●
                </div>

                <div class="bowl"></div>

            </div>


            <div class="toy">
                🧶
            </div>

        `;


        hotel.appendChild(
            room
        );


        renderDirt(
            room,
            roomData
        );


        const cat =
            cats.find(
                cat =>
                    cat.room === i
            );


        if (cat) {

            createCatElement(
                cat,
                room
            );

        } else {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "empty-room";


            empty.innerHTML = `

                <div class="empty-paw">
                    🐾
                </div>

                WOLNY POKÓJ

            `;


            room.appendChild(
                empty
            );

        }

    }


    updateUI();

}


// ==========================================================
// RENDER DIRT
// ==========================================================

function renderDirt(
    room,
    roomData
) {

    if (!roomData) {

        return;

    }


    for (
        let i = 0;
        i < roomData.dirt;
        i++
    ) {

        const dirt =
            document.createElement(
                "div"
            );


        dirt.className =
            "dirt";


        dirt.textContent =
            i % 2 === 0
                ? "🗑️"
                : "💩";


        dirt.style.left =
            random(
                80,
                380
            )
            +
            "px";


        dirt.style.top =
            random(
                215,
                270
            )
            +
            "px";


        room.appendChild(
            dirt
        );

    }

}


// ==========================================================
// CREATE CAT ELEMENT
// ==========================================================

function createCatElement(
    cat,
    room
) {

    const element =
        document.createElement(
            "div"
        );


    element.id =
        `cat-${cat.id}`;


    element.className =
        "cat";


    if (
        selectedCatId
        === cat.id
    ) {

        element.classList.add(
            "selected"
        );

    }


    if (
        cat.walking
    ) {

        element.classList.add(
            "walking"
        );

    }


    if (
        cat.currentAction
        === "sleep"
    ) {

        element.classList.add(
            "sleeping"
        );

    }


    element.style.left =
        cat.x
        +
        "px";


    element.style.top =
        cat.y
        +
        "px";


    element.style.setProperty(
        "--cat-main",
        cat.main
    );


    element.style.setProperty(
        "--cat-dark",
        cat.dark
    );


    element.style.setProperty(
        "--cat-light",
        cat.light
    );


    element.style.setProperty(
        "--cat-patch",
        cat.patch
    );


    if (
        cat.direction === -1
    ) {

        element.style.transform =
            "scaleX(-1)";

    }


    const need =
        getCatNeed(
            cat
        );


    element.innerHTML = `

        <div
            class="
                need-bubble
                ${need ? "visible" : ""}
            "
        >
            ${need}
        </div>


        <div class="cat-name">
            ${cat.name}
        </div>


        <div class="pixel-tail"></div>


        <div class="pixel-body"></div>


        <div class="leg front"></div>

        <div class="leg back"></div>


        <div class="pixel-head">


            <div class="ear left">

                <div class="ear-inner"></div>

            </div>


            <div class="ear right">

                <div class="ear-inner"></div>

            </div>


            <div class="eye left"></div>

            <div class="eye right"></div>


            <div class="cheek left"></div>

            <div class="cheek right"></div>


            <div class="nose"></div>

            <div class="mouth"></div>


        </div>

    `;


    element.addEventListener(
        "click",

        event => {

            event.stopPropagation();

            selectCat(
                cat.id
            );

        }
    );


    room.appendChild(
        element
    );

}


// ==========================================================
// SELECT CAT
// ==========================================================

function selectCat(id) {

    selectedCatId =
        id;


    renderHotel();

}


// ==========================================================
// GET CAT NEED
// ==========================================================

function getCatNeed(cat) {

    if (
        cat.busy
    ) {

        switch (
            cat.currentAction
        ) {

            case "eat":
                return "🍗";

            case "sleep":
                return "💤";

            case "play":
                return "🧶";

            case "toilet":
                return "🚽";

        }

    }


    const needs = [

        {
            value:
                cat.hunger,

            icon:
                "🍗"
        },

        {
            value:
                cat.energy,

            icon:
                "💤"
        },

        {
            value:
                cat.fun,

            icon:
                "🧶"
        },

        {
            value:
                cat.toilet,

            icon:
                "🚽"
        }

    ];


    needs.sort(
        (
            a,
            b
        ) =>
            a.value
            -
            b.value
    );


    if (
        needs[0].value < 35
    ) {

        return needs[0].icon;

    }


    return "";

}


// ==========================================================
// COMMAND
// ==========================================================

function commandSelectedCat(
    action
) {

    const cat =
        getSelectedCat();


    if (!cat) {

        addMessage(
            "🐱 Najpierw wybierz kota."
        );

        return;

    }


    if (
        cat.busy
    ) {

        addMessage(
            `⏳ ${cat.name} jest teraz zajęty.`
        );

        return;

    }


    performAction(
        cat,
        action
    );

}


// ==========================================================
// PERFORM ACTION
// ==========================================================

function performAction(
    cat,
    action
) {

    let location =
        null;


    let duration =
        3000;


    switch (
        action
    ) {

        case "eat":

            location =
                locations.food;

            duration =
                3000;

            break;


        case "sleep":

            location =
                locations.bed;

            duration =
                5000;

            break;


        case "play":

            location =
                locations.play;

            duration =
                3500;

            break;


        case "toilet":

            location =
                locations.toilet;

            duration =
                2800;

            break;

    }


    cat.busy =
        true;


    cat.currentAction =
        action;


    walkCatTo(
        cat,
        location.x,
        location.y
    );


    setTimeout(
        () => {

            cat.walking =
                false;


            refreshCatElement(
                cat
            );

        },

        1250
    );


    setTimeout(
        () => {

            finishAction(
                cat,
                action
            );

        },

        1250
        +
        duration
    );

}


// ==========================================================
// FINISH ACTION
// ==========================================================

function finishAction(
    cat,
    action
) {

    switch (
        action
    ) {

        case "eat":

            cat.hunger =
                Math.min(
                    100,
                    cat.hunger
                    +
                    50
                );


            cat.toilet =
                Math.max(
                    0,
                    cat.toilet
                    -
                    8
                );


            addMessage(
                `🍗 ${cat.name} zjadł posiłek.`
            );

            break;


        case "sleep":

            cat.energy =
                Math.min(
                    100,
                    cat.energy
                    +
                    60
                );


            addMessage(
                `💤 ${cat.name} się wyspał.`
            );

            break;


        case "play":

            cat.fun =
                Math.min(
                    100,
                    cat.fun
                    +
                    55
                );


            cat.energy =
                Math.max(
                    0,
                    cat.energy
                    -
                    8
                );


            cat.hunger =
                Math.max(
                    0,
                    cat.hunger
                    -
                    5
                );


            addMessage(
                `🧶 ${cat.name} pobawił się kłębkiem.`
            );

            break;


        case "toilet":

            cat.toilet =
                100;


            createRoomDirt(
                cat.room
            );


            addMessage(
                `🚽 ${cat.name} skorzystał z kuwety.`
            );

            break;

    }


    cat.busy =
        false;


    cat.currentAction =
        null;


    cat.walking =
        false;


    calculateHappiness(
        cat
    );


    saveGame();

    renderHotel();

}


// ==========================================================
// CLEAN ROOM
// ==========================================================

function cleanSelectedRoom() {

    const cat =
        getSelectedCat();


    if (!cat) {

        addMessage(
            "🧹 Wybierz kota, aby wybrać jego pokój."
        );

        return;

    }


    const room =
        rooms[
            cat.room
        ];


    if (
        !room
        ||
        room.dirt <= 0
    ) {

        addMessage(
            "✨ Ten pokój jest już czysty."
        );

        return;

    }


    if (
        coins < 5
    ) {

        addMessage(
            "💸 Potrzebujesz 5 monet."
        );

        return;

    }


    coins -= 5;


    room.dirt =
        0;


    addMessage(
        `🧹 Pokój ${cat.room + 1} został posprzątany.`
    );


    saveGame();

    renderHotel();

}


// ==========================================================
// ROOM DIRT
// ==========================================================

function createRoomDirt(
    roomIndex
) {

    const room =
        rooms[
            roomIndex
        ];


    if (!room) {

        return;

    }


    room.dirt =
        Math.min(
            5,
            room.dirt
            +
            1
        );

}


// ==========================================================
// MOVE CAT
// ==========================================================

function walkCatTo(
    cat,
    x,
    y
) {

    cat.direction =
        x < cat.x
            ? -1
            : 1;


    cat.x =
        x;


    cat.y =
        y;


    cat.walking =
        true;


    refreshCatElement(
        cat
    );

}


// ==========================================================
// RANDOM WALK
// ==========================================================

function randomWalk() {

    cats.forEach(
        cat => {

            if (
                cat.busy
            ) {

                return;

            }


            if (
                Math.random()
                >
                0.58
            ) {

                return;

            }


            const roomElement =
                document.getElementById(
                    `room-${cat.room}`
                );


            if (
                !roomElement
            ) {

                return;

            }


            const roomWidth =
                roomElement
                    .clientWidth;


            const maxX =
                Math.max(
                    130,
                    roomWidth
                    -
                    80
                );


            const newX =
                random(
                    70,
                    maxX
                );


            const newY =
                random(
                    145,
                    220
                );


            walkCatTo(
                cat,
                newX,
                newY
            );


            setTimeout(
                () => {

                    if (
                        !cat.busy
                    ) {

                        cat.walking =
                            false;


                        refreshCatElement(
                            cat
                        );

                    }

                },

                1300
            );

        }
    );

}


// ==========================================================
// REFRESH CAT
// ==========================================================

function refreshCatElement(
    cat
) {

    const element =
        document.getElementById(
            `cat-${cat.id}`
        );


    if (
        !element
    ) {

        return;

    }


    element.style.left =
        cat.x
        +
        "px";


    element.style.top =
        cat.y
        +
        "px";


    if (
        cat.direction
        === -1
    ) {

        element.style.transform =
            "scaleX(-1)";

    } else {

        element.style.transform =
            "scaleX(1)";

    }


    element.classList.toggle(
        "walking",
        cat.walking
    );


    element.classList.toggle(
        "sleeping",
        cat.currentAction
        ===
        "sleep"
    );


    const bubble =
        element.querySelector(
            ".need-bubble"
        );


    if (
        bubble
    ) {

        const need =
            getCatNeed(
                cat
            );


        bubble.textContent =
            need;


        bubble.classList.toggle(
            "visible",
            Boolean(
                need
            )
        );

    }


    updateSelectedCatPanel();

}


// ==========================================================
// DECAY NEEDS
// ==========================================================

function decayNeeds() {

    cats.forEach(
        cat => {

            if (
                cat.busy
            ) {

                return;

            }


            cat.hunger =
                Math.max(
                    0,
                    cat.hunger
                    -
                    random(
                        1,
                        3
                    )
                );


            cat.energy =
                Math.max(
                    0,
                    cat.energy
                    -
                    random(
                        1,
                        2
                    )
                );


            cat.fun =
                Math.max(
                    0,
                    cat.fun
                    -
                    random(
                        1,
                        2
                    )
                );


            cat.toilet =
                Math.max(
                    0,
                    cat.toilet
                    -
                    random(
                        1,
                        2
                    )
                );


            calculateHappiness(
                cat
            );


            refreshCatElement(
                cat
            );

        }
    );


    saveGame();

}


// ==========================================================
// HAPPINESS
// ==========================================================

function calculateHappiness(
    cat
) {

    const room =
        rooms[
            cat.room
        ];


    const cleanlinessPenalty =
        room
            ? room.dirt * 5
            : 0;


    cat.happiness =
        Math.max(
            0,

            Math.round(

                (
                    cat.hunger
                    +
                    cat.energy
                    +
                    cat.fun
                    +
                    cat.toilet
                )

                /
                4

                -
                cleanlinessPenalty

            )
        );

}


// ==========================================================
// MOOD
// ==========================================================

function getMood(
    cat
) {

    if (
        cat.happiness
        >= 85
    ) {

        return "😻 Zachwycony pobytem!";

    }


    if (
        cat.happiness
        >= 65
    ) {

        return "😺 Zadowolony";

    }


    if (
        cat.happiness
        >= 40
    ) {

        return "🐱 Potrzebuje opieki";

    }


    if (
        cat.happiness
        >= 20
    ) {

        return "😿 Niezadowolony";

    }


    return "🙀 Bardzo nieszczęśliwy";

}


// ==========================================================
// NEXT DAY
// ==========================================================

function nextDay() {

    day++;


    isNight =
        !isNight;


    updateDayNight();


    const leavingCats =
        [];


    cats.forEach(
        cat => {

            calculateHappiness(
                cat
            );


            const room =
                rooms[
                    cat.room
                ];


            if (
                room
                &&
                Math.random()
                <
                0.45
            ) {

                room.dirt =
                    Math.min(
                        5,
                        room.dirt
                        +
                        1
                    );

            }


            const dailyIncome =
                Math.max(

                    3,

                    Math.round(
                        cat.happiness
                        /
                        7
                    )

                );


            coins +=
                dailyIncome;


            cat.stayDays--;


            if (
                cat.happiness
                >
                80
            ) {

                reputation +=
                    0.03;

            }


            if (
                cat.happiness
                <
                30
            ) {

                reputation -=
                    0.07;

            }


            if (
                cat.stayDays
                <=
                0
            ) {

                leavingCats.push(
                    cat
                );

            }

        }
    );


    leavingCats.forEach(
        checkoutCat
    );


    reputation =
        Math.max(
            0.1,
            reputation
        );


    addMessage(
        `🌙 Rozpoczął się dzień ${day}.`
    );


    saveGame();

    renderHotel();

}


// ==========================================================
// CHECKOUT
// ==========================================================

function checkoutCat(
    cat
) {

    calculateHappiness(
        cat
    );


    if (
        cat.happiness
        >=
        70
    ) {

        const tip =
            Math.round(

                10
                +
                cat.happiness
                *
                reputation
                /
                4

            );


        coins +=
            tip;


        reputation +=
            0.1;


        addMessage(
            `⭐ ${cat.name} wymeldował się szczęśliwy. Napiwek: ${tip} 💰`
        );

    } else {

        reputation =
            Math.max(
                0.1,
                reputation
                -
                0.12
            );


        addMessage(
            `😿 ${cat.name} wymeldował się niezadowolony.`
        );

    }


    cats =
        cats.filter(
            current =>
                current.id
                !==
                cat.id
        );


    if (
        selectedCatId
        ===
        cat.id
    ) {

        selectedCatId =
            null;

    }

}


// ==========================================================
// DAY / NIGHT
// ==========================================================

function updateDayNight() {

    const body =
        document.body;


    const icon =
        document.getElementById(
            "dayIcon"
        );


    const text =
        document.getElementById(
            "timeText"
        );


    if (
        isNight
    ) {

        body.classList.add(
            "night"
        );


        icon.textContent =
            "🌙";


        text.textContent =
            "NOC";

    } else {

        body.classList.remove(
            "night"
        );


        icon.textContent =
            "☀️";


        text.textContent =
            "DZIEŃ";

    }

}


// ==========================================================
// SELECTED CAT
// ==========================================================

function getSelectedCat() {

    return cats.find(
        cat =>
            cat.id
            ===
            selectedCatId
    );

}


// ==========================================================
// SELECTED CAT PANEL
// ==========================================================

function updateSelectedCatPanel() {

    const container =
        document.getElementById(
            "selectedCatInfo"
        );


    const cat =
        getSelectedCat();


    if (
        !cat
    ) {

        container.innerHTML = `

            <div class="no-cat">
                Kliknij kota w pokoju.
            </div>

        `;

        return;

    }


    calculateHappiness(
        cat
    );


    const room =
        rooms[
            cat.room
        ];


    container.innerHTML = `

        <div class="selected-title">

            🐱 ${cat.name}

        </div>


        <div class="selected-room">

            Pokój ${cat.room + 1}

            •

            pobyt:
            ${cat.stayDays}
            dni

            •

            🧹
            ${room ? room.dirt : 0}/5

        </div>


        ${needBar(
            "🍗 JEDZENIE",
            cat.hunger
        )}


        ${needBar(
            "💤 ENERGIA",
            cat.energy
        )}


        ${needBar(
            "🧶 ZABAWA",
            cat.fun
        )}


        ${needBar(
            "🚽 KUWETA",
            cat.toilet
        )}


        ${needBar(
            "❤️ ZADOWOLENIE",
            cat.happiness
        )}


        <div class="mood-text">

            ${getMood(cat)}

        </div>

    `;

}


// ==========================================================
// BAR
// ==========================================================

function needBar(
    title,
    value
) {

    let color =
        "#62ba73";


    if (
        value < 60
    ) {

        color =
            "#dfbd55";

    }


    if (
        value < 30
    ) {

        color =
            "#d55e63";

    }


    return `

        <div class="need-row">

            <div class="need-title">

                <span>
                    ${title}
                </span>

                <span>
                    ${Math.round(value)}%
                </span>

            </div>


            <div class="bar">

                <div
                    class="bar-fill"

                    style="
                        width:
                        ${value}%;

                        background:
                        ${color};
                    "
                ></div>

            </div>

        </div>

    `;

}


// ==========================================================
// UI
// ==========================================================

function updateUI() {

    document.getElementById(
        "coins"
    ).textContent =
        Math.floor(
            coins
        );


    document.getElementById(
        "reputation"
    ).textContent =
        reputation.toFixed(
            1
        );


    document.getElementById(
        "day"
    ).textContent =
        day;


    document.getElementById(
        "roomPrice"
    ).textContent =
        getRoomPrice();


    document.getElementById(
        "roomCountText"
    ).textContent =
        roomCount;


    document.getElementById(
        "guestCount"
    ).textContent =
        `${cats.length}/${roomCount}`;


    updateSelectedCatPanel();

}


// ==========================================================
// MESSAGE
// ==========================================================

function addMessage(
    text
) {

    const box =
        document.getElementById(
            "messages"
        );


    const paragraph =
        document.createElement(
            "p"
        );


    paragraph.textContent =
        text;


    box.prepend(
        paragraph
    );


    while (
        box.children.length
        >
        10
    ) {

        box.removeChild(
            box.lastChild
        );

    }

}


// ==========================================================
// SAVE
// ==========================================================

function saveGame() {

    const save = {

        coins:
            coins,

        reputation:
            reputation,

        day:
            day,

        roomCount:
            roomCount,

        selectedCatId:
            selectedCatId,

        nextCatId:
            nextCatId,

        isNight:
            isNight,

        cats:
            cats,

        rooms:
            rooms

    };


    localStorage.setItem(
        "pixelCatHotelSave",
        JSON.stringify(
            save
        )
    );

}


// ==========================================================
// LOAD
// ==========================================================

function loadGame() {

    const raw =
        localStorage.getItem(
            "pixelCatHotelSave"
        );


    if (
        !raw
    ) {

        return false;

    }


    try {

        const save =
            JSON.parse(
                raw
            );


        coins =
            save.coins
            ??
            coins;


        reputation =
            save.reputation
            ??
            reputation;


        day =
            save.day
            ??
            day;


        roomCount =
            save.roomCount
            ??
            roomCount;


        selectedCatId =
            save.selectedCatId
            ??
            null;


        nextCatId =
            save.nextCatId
            ??
            nextCatId;


        isNight =
            save.isNight
            ??
            false;


        cats =
            Array.isArray(
                save.cats
            )
                ? save.cats
                : [];


        rooms =
            Array.isArray(
                save.rooms
            )
                ? save.rooms
                : [];


        while (
            rooms.length
            <
            roomCount
        ) {

            rooms.push({

                id:
                    rooms.length,

                dirt:
                    0

            });

        }


        cats.forEach(
            cat => {

                cat.busy =
                    false;

                cat.currentAction =
                    null;

                cat.walking =
                    false;

            }
        );


        return true;

    } catch (
        error
    ) {

        console.error(
            "Save load error:",
            error
        );


        return false;

    }

}


// ==========================================================
// AUTO SAVE
// ==========================================================

setInterval(
    saveGame,
    10000
);


// ==========================================================
// GAME LOOPS
// ==========================================================

setInterval(
    randomWalk,
    2400
);


setInterval(
    decayNeeds,
    5000
);


// 1 dzień co 35 sekund

setInterval(
    nextDay,
    35000
);


// ==========================================================
// RESIZE
// ==========================================================

window.addEventListener(
    "resize",
    () => {

        renderHotel();

    }
);


// ==========================================================
// START
// ==========================================================

const loaded =
    loadGame();


if (
    !loaded
) {

    initializeRooms();


    cats.push(
        createCat(
            0
        )
    );


    cats.push(
        createCat(
            1
        )
    );


    cats.push(
        createCat(
            2
        )
    );


    cats.push(
        createCat(
            3
        )
    );

}


updateDayNight();

renderHotel();

updateUI();

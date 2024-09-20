class Dog {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.hungerLevel = 50;
    }

    eat() {
        if (this.hungerLevel < 10) {
            return false;
        }
        this.hungerLevel = 0;
        return true;
    }

    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}, Hunger Level: ${this.hungerLevel}`;
    }
}

// Create instances of Dog
let dog1 = new Dog("Jojo",4);
let dog2 = new Dog("Spark",2);

// Function to update dog info in the DOM
function updateDogInfo() {
    let dogInfoDiv = document.getElementById("dog-info");
    dogInfoDiv.innerHTML = `<p>${dog1.displayInfo()}</p><p>${dog2.displayInfo()}</p>`;
}

// Update dog info initially
updateDogInfo();

// Add event listener to the button to feed the dog
document.getElementById("feed-dog").addEventListener("click", function() {
    dog1.eat(); // Feed the first dog
    dog2.eat();
    updateDogInfo(); // Update the displayed information
});

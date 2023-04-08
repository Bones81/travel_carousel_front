document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelector(".carousel-items");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let itemIndex = 0;
    let items = []

    // GET PHOTOS FROM BACKEND
    const apiUrl = "http://localhost:8000/api/photos"; // Replace with your API endpoint

    function createCarouselItem(itemData) {
        const item = document.createElement("img");
        item.setAttribute("src", itemData.image_file);
        item.setAttribute("alt", itemData.comments);
        return item;
    }
    
    function populateCarousel() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(itemData => {
                    const item = createCarouselItem(itemData);
                    items.push(item)
                    carouselItems.appendChild(item);
                });
                moveToSelected(itemIndex);
            })
            .catch(error => {
                console.error("Error fetching photos:", error);
            });
    }

    function moveToSelected(itemIndex) {
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            items[i].classList.remove("selected");
        }
        items[itemIndex].classList.add("selected");
    }

    function nextItem() {
        const current = items[itemIndex]
        current.classList.remove('selected')
        current.classList.add('previous')
        itemIndex++;
        if (itemIndex >= items.length) {
            itemIndex = 0;
        }
        const next = items[itemIndex]
        next.classList.add('selected')
        next.classList.add('next')
        setTimeout(() => {
            current.classList.remove('previous')
            next.classList.remove('next')
        }, 500);
    }

    function prevItem() {
        const current = items[itemIndex]
        current.classList.remove('selected')
        current.classList.add('next')
        itemIndex--;
        if (itemIndex < 0) {
            itemIndex = items.length - 1;
        }
        const prev = items[itemIndex]
        prev.classList.add('selected')
        prev.classList.add('previous')
        setTimeout(() => {
            current.classList.remove('next')
            prev.classList.remove('previous')
        }, 500);
    }

    prevBtn.addEventListener("click", prevItem);
    nextBtn.addEventListener("click", nextItem);

    populateCarousel()

})
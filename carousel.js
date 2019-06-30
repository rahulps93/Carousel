var carousel = (function (d) {
    function carousel(settings) {

        this.images = settings.images;
        this.timeDelay = settings.autoplayDelay;
        this.id = settings.id;

        this.slide = 0;
        this.items = [];
        this.moving = false;


        this.disableInteraction = function () {


            this.moving = true;
            var self = this;

            setTimeout(function () {
                self.moving = false
            }, 500);
        }

        this.createItems = function () {
            var carousel = d.getElementById(this.id);
            carousel.className = "carousel-wrapper";
            var carouselDiv = document.createElement("div");
            carouselDiv.className = "carousel";
            carousel.append(carouselDiv);
            var self = this;
            this.images.forEach(element => {

                var cardDiv = document.createElement("div");
                cardDiv.className = "carousel_card";
                var imgDiv = document.createElement("img");
                imgDiv.className = "carousel__photo";
                imgDiv.src = element.src;
                var link = document.createElement("a");
                link.innerHTML = element.name;
                link.className = "link";
                link.addEventListener('click', this.toggleModal.bind(this, element));
                cardDiv.appendChild(imgDiv);
                cardDiv.append(link);
                carouselDiv.append(cardDiv);
                self.items.push(cardDiv);
            });

            this.next = document.createElement("div");
            this.next.className = "carousel__button--next";
            carousel.append(this.next);
            this.prev = document.createElement("div");
            this.prev.className = "carousel__button--prev";
            carousel.append(this.prev);
            this.modal = document.createElement("div");
            this.modal.className = "modal";
            this.modalContent = document.createElement("div");
            this.modalContent.className = "modal-content";
            this.modal.appendChild(this.modalContent);
            document.body.append(this.modal);
            //.items = d.getElementsByClassName("carousel_card");
            this.totalItems = this.items.length;
        }




        this.setInitialClasses = function () {
            this.items[this.totalItems - 1].classList.add("prev");
            this.items[0].classList.add("active");
            this.items[1].classList.add("next");
        }

        this.attachEventHandlers = function () {
            var self = this;
            this.next.addEventListener('click', this.moveNext.bind(self));
            this.prev.addEventListener('click', this.movePrev.bind(self));
            if (this.timeDelay) {
                setInterval(function () {
                    self.moveNext();
                }, this.timeDelay);
            }
            window.addEventListener("click", this.windowOnClick.bind(this));

        }

        this.toggleModal = function (element) {


            var span = d.createElement("span");
            span.innerHTML = "X";
            span.className = "close-button";
            span.addEventListener("click", this.toggleModal.bind(this));

            var modalContent = d.createElement("img");
            modalContent.src = element.src;
            modalContent.className = "modal-img";


            while (this.modalContent.firstChild)
                this.modalContent.removeChild(this.modalContent.firstChild);

            this.modalContent.append(span);
            this.modalContent.append(modalContent);
            this.modal.classList.toggle("show-modal");
        }

        this.windowOnClick = function (event) {
            if (event.target === this.modal) {
                this.toggleModal();
            }
        }

        this.moveNext = function () {
            if (!this.moving) {
                if (this.slide === (this.totalItems - 1)) {
                    this.slide = 0;
                } else {
                    this.slide++;
                }

                this.moveCarouselTo();
            }
        }
        this.movePrev = function () {
            if (!this.moving) {
                if (this.slide === 0) {
                    this.slide = this.totalItems - 1;
                } else {
                    this.slide--;
                }

                this.moveCarouselTo();
            }
        }

        this.moveCarouselTo = function () {
            this.disableInteraction();
            for (let i = 0; i < this.totalItems; i++) {
                this.items[i].className = "carousel_card";
            }



            var prevSlide = this.slide === 0 ? this.totalItems - 1 : this.slide - 1;
            var nextSlide = this.slide === this.totalItems - 1 ? 0 : this.slide + 1;
            this.items[prevSlide].classList.add("prev");
            this.items[this.slide].classList.add("active");
            this.items[nextSlide].classList.add("next");
        }

    }

    function initCarousel(settings) {
        var carouselInstance = new carousel(settings);
        carouselInstance.createItems();
        carouselInstance.setInitialClasses();
        carouselInstance.attachEventHandlers();

    }
    return {
            init:initCarousel
    };

  


}(document));


